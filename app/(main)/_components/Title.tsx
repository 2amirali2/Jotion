"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useRef, useState } from "react"

const Title = ({ document }: { document: Doc<"documents"> }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState(document.title || "Untitled")
  const [isEditing, setIsEditing] = useState(false)

  const update = useMutation(api.documents.update)

  const onClick = () => {
    setTitle(document.title)
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0)
  }

  const onUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    update({
      id: document._id,
      title: e.target.value || "Untitled",
    })
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false)
    }
  }
  return (
    <div>
      <div className="flex gap-x-1 items-center">
        {document.icon && (
          <p className="text-[18px] shrink-0 mr-2">{document.icon}</p>
        )}
        {isEditing ? (
          <Input
            ref={inputRef}
            value={title}
            type="text"
            onChange={onUpdate}
            onClick={onClick}
            onKeyDown={onKeyDown}
            onBlur={() => setIsEditing(false)}
            className="h-7 px-2 focus-visible:ring-transparent"
          />
        ) : (
          <Button
            onClick={onClick}
            variant={"ghost"}
            size={"sm"}
            className="font-normal h-auto p-1"
          >
            <span className="truncate">{document?.title}</span>
          </Button>
        )}
      </div>
    </div>
  )
}
export default Title

Title.Skeleton = function TitleSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-[100px] bg-primary/5" />
    </div>
  )
}
