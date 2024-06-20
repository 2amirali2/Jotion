"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/clerk-react"
import { useMutation } from "convex/react"
import {
  ChevronDown,
  ChevronRight,
  File,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
  document: Doc<"documents">
  onExpand?: () => void
  expanded?: boolean
  level?: number
  active: boolean
}

const FileItem = ({
  document,
  expanded,
  onExpand,
  level = 0,
  active,
}: Props) => {
  const { user } = useUser()
  const router = useRouter()

  const archive = useMutation(api.documents.archive)
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const promise = create({
      title: "Untitled",
      parentDocument: document._id,
    })

    toast.promise(promise, {
      loading: "Creating a note...",
      success: "Note Created",
      error: "Failed to Creating a note",
    })
  }

  const onArchive = (docuemntId: Id<"documents">) => {
    const promise = archive({
      id: docuemntId,
    })

    toast.promise(promise, {
      loading: "Moving to trah...",
      success: "Note moved to trash",
      error: "Failed to move note to trash.",
    })
  }

  const ChevronIcon = expanded ? ChevronDown : ChevronRight

  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5"
      )}
      role="button"
      onClick={() => router.push(`/documents/${document._id}`)}
      key={document._id}
    >
      <div
        className="flex items-center text-muted-foreground gap-x-1"
        role="button"
      >
        <div
          className="hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm"
          onClick={() => onExpand?.()}
          role="button"
        >
          <ChevronIcon className="h-4 w-4 text-muted-foreground" />
        </div>
        {document.icon ? (
          <p className="text-[18px] shrink-0 mr-2">{document.icon}</p>
        ) : (
          <File className="h-[18px] w-[18px] text-muted-foreground shrink-0 mr-2" />
        )}
      </div>
        <span
          onClick={() => router.push(`/documents/${document._id}`)}
          className={cn("truncate", active && "text-black dark:text-white")}
        >
          {document.title}
        </span>
      <div className="ml-auto flex items-center gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              role="button"
              className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            >
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="center" className="w-60">
            <DropdownMenuItem onClick={() => onArchive(document._id)}>
              <div className="flex items-center text-sm">
                <Trash className="h-4 w-4 mr-2" /> Delete
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className=" p-2 text-xs text-muted-foreground">
              Last edited by: {user?.fullName}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div
          className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          role="button"
          onClick={onCreate}
        >
          <Plus className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}
export default FileItem

FileItem.Skeleton = function FileItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4 dark:bg-neutral-600 bg-primary/5" />
      <Skeleton className="h-4 w-[30%] dark:bg-neutral-600 bg-primary/5" />
    </div>
  )
}
