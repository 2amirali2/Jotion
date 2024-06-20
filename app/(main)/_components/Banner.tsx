"use client"

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
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

const Banner = ({ documentId }: { documentId: Id<"documents"> }) => {
    const router = useRouter()
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

    router.push("/documents")
  }
  return (
    <div className="w-full text-center bg-rose-500 p-2 flex items-center justify-center text-white gap-x-2 text-sm">
      <p>This page is in Trash</p>
      <Button
        className="bg-transparent border-white border hover:bg-primary/5 dark:text-white"
        size={"sm"}
        onClick={() => onRestore(documentId)}
      >
        Restore page
      </Button>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button
            className="bg-transparent border-white border hover:bg-primary/5 dark:text-white"
            size={"sm"}
          >
            Delete forever
          </Button>{" "}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(documentId)}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
export default Banner
