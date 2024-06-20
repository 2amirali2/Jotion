"use client"

import { UploadDropzone } from "@/utils/uploadthing"
import { DialogContent, Dialog, DialogHeader } from "./ui/dialog"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void;
  documentId: Id<"documents">
}

const CoverImageModal = ({ onOpenChange, open, documentId }: Props) => {
  const update = useMutation(api.documents.update)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <div>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                update({
                    id: documentId,
                    coverImage: res[0].url
                })
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default CoverImageModal
