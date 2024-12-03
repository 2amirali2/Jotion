import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { ArchiveRestore, Loader, Search, Trash } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"

interface Props {
  isMobile: boolean
}

const TrashItem = ({ isMobile }: Props) => {
  const params = useParams()
  const router = useRouter()
  const documents = useQuery(api.documents.getArchive)
  const restore = useMutation(api.documents.restore)
  const deleteDocument = useMutation(api.documents.deleteDocument)

  const onRestore = (documentId: Id<"documents">) => {
    const promise = restore({
      id: documentId,
    })

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note Restored",
      error: "Failed to restore note.",
    })
  }

  const onDelete = (documentId: Id<"documents">) => {
    const promise = deleteDocument({
      id: documentId,
    })

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note Deleted",
      error: "Failed to delete note.",
    })

    if (params.documentId === documentId) {
      router.push("/documents")
    }
  }

  if (documents === undefined) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="h-4 w-4 animate-spin" />
      </div>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild className="mt-3 cursor-pointer">
        <div className="flex items-center hover:bg-primary/5 py-1">
          <div className="flex items-center px-3 text-muted-foreground gap-x-2">
            <Trash className="h-4 w-4" />
            <p>Trash</p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent side={isMobile ? "bottom" : "right"} className="p-0 w-72">
        <div className="dark:bg-black flex flex-col pb-2 rounded-md">
          <div className="flex items-center px-1 py-3 gap-x-2">
            <Search className="h-5 w-5" />
            <Input
              className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
              placeholder="Filter by page title..."
            />
          </div>
          <div className="w-full text-center text-xs text-muted-foreground">
            {documents?.map((document) => (
              <div
                key={document._id}
                className="flex justify-between items-center px-2 pt-1 hover:bg-secondary dark:hover:bg-neutral-600"
                onClick={() => router.push(`/documents/${document._id}`)}
              >
                <p className="text-base">{document.title}</p>
                <div className="flex items-center gap-x-1">
                  <ArchiveRestore
                    className="p-1 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm"
                    onClick={() => onRestore(document._id)}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash className="p-1 hover:bg-neutral-300 dark:hover:bg-neutral-600" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(document._id)}
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
            {documents.length === 0 && <p>No documents found.</p>}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
export default TrashItem
