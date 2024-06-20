"use client"

import Image from "next/image"
import { Skeleton } from "./ui/skeleton"
import { useState } from "react"
import { ImageIcon, X } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"
import CoverImageModal from "./CoverImageModal"

interface Props {
  url?: string
  documentId: Id<"documents">
  preview: boolean
}

const Cover = ({ url, documentId, preview }: Props) => {
  const removeImage = useMutation(api.documents.removeImage)
  const params = useParams()

  const onRemoveImage = () => {
    removeImage({
      id: params.documentId as Id<"documents">,
    })
  }

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && (
        <Image
          src={url}
          alt="cover"
          className="object-cover"
          fill
        />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          {/* <Button
            className="text-muted-foreground text-xs"
            variant={"outline"}
            onClick={() => setCoverImage(!coverImage)}
            size={"sm"}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            <CoverImageModal
              open={coverImage}
              onOpenChange={setCoverImage}
              documentId={documentId}
            />
            Change cover
          </Button> */}
          <Button
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
            onClick={onRemoveImage}
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}
export default Cover

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />
}
