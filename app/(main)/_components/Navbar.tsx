"use client"

import { MenuIcon, MoreHorizontal, Trash } from "lucide-react"
import Title from "./Title"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@clerk/clerk-react"
import { toast } from "sonner"
import Publish from "./Publish"
import Banner from "./Banner"
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
  isCollapsed: boolean
  onResetWidth: () => void
}

const Navbar = ({ isCollapsed, onResetWidth }: Props) => {
  const { user } = useUser()
  const params = useParams()
  const archive = useMutation(api.documents.archive)

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

  const document = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId as Id<"documents">,
  })

  if (document === undefined) {
    return (
      <>
      <div className="w-full flex items-center justify-between px-3 py-1">
        <Title.Skeleton />
        <Skeleton className="h-10 w-10 bg-primary/5" />
      </div>
      <Skeleton className="w-full h-7 bg-primary/5" />
      </>
    )
  }
  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            className="h-6 w-6 text-muted-foreground"
            role="button"
            onClick={onResetWidth}
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title document={document} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="p-3 hover:bg-primary/5 dark:hover:bg-neutral-600 rounded-sm">
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end" className="w-60">
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
          </div>
        </div>
      </nav>
      {document.isArchived && (
        <Banner documentId={document._id}  />
      )}
    </>
  )
}
export default Navbar
