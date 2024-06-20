"use client"

import { Doc } from "@/convex/_generated/dataModel"
import TextareaAutosize from "react-textarea-autosize"
import { Button } from "./ui/button"
import { Image as ImageIcon, Smile, X } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { ChangeEvent, useRef, useState } from "react"
import IconPicker from "./IconPicker"
import CoverImageModal from "./CoverImageModal"

interface Props {
  documentData: Doc<"documents">
  preview?: boolean
}

const Toolbar = ({ documentData, preview }: Props) => {
  const update = useMutation(api.documents.update)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [title, setTitle] = useState(documentData.title || "Untitled")
  const [isEditing, setIsEditing] = useState(false)
  const removeIcon = useMutation(api.documents.removeIcon)
  const [coverImage, setCoverImage] = useState(false)

  const onClick = () => {
    if (preview) return

    setIsEditing(true)
    setTimeout(() => {
      setTitle(documentData.title)
      textareaRef.current?.focus()
    }, 0)
  }

  const onUpdate = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditing(true)
    setTitle(e.target.value)
    update({
      id: documentData._id,
      title: title || "Untitled",
    })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false)
    }
  }

  const onIconSelect = (icon: string) => {
    update({
      id: documentData._id,
      icon,
    })
  }

  const onRemoveIcon = () => {
    removeIcon({
      id: documentData._id,
    })
  }

  return (
    <div className="pl-[54px] group relative">
      {!!documentData.icon && !preview && (
        <div className="flex items-center gap-x-1 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {documentData.icon}
            </p>
          </IconPicker>
          <Button
            variant={"outline"}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            onClick={onRemoveIcon}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {documentData.icon && preview && (
        <p className="text-6xl pt-6">{documentData.icon}</p>
      )}

      <div className="group-hover:opacity-100 opacity-0 flex items-center gap-x-2 py-4">
        {!documentData.icon && !preview && (
          <IconPicker onChange={onIconSelect}>
            <Button
              variant={"outline"}
              className="text-sm text-muted-foreground flex items-center gap-x-1 border rounded-lg"
            >
              <Smile className="h-4 w-4" /> Add icon
            </Button>
          </IconPicker>
        )}
        {!documentData.coverImage && !preview && (
          <>
            <Button
              variant={"outline"}
              onClick={() => setCoverImage(!coverImage)}
              className="text-sm text-muted-foreground flex items-center gap-x-1 border rounded-lg"
            >
              <ImageIcon className="h-4 w-4" />
              Add cover
            </Button>
            <CoverImageModal
              open={coverImage}
              onOpenChange={setCoverImage}
              documentId={documentData._id}
            />
          </>
        )}
      </div>

      {isEditing && !preview ? (
        <TextareaAutosize
          ref={textareaRef}
          value={title}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
          onChange={onUpdate}
          onKeyDown={onKeyDown}
          onClick={onClick}
        />
      ) : (
        <div
          className="text-5xl font-extrabold pb-11 text-[#3F3F3F] dark:text-[#CFCFCF]"
          role="button"
          onClick={onClick}
        >
          {documentData.title}
        </div>
      )}
    </div>
  )
}
export default Toolbar
