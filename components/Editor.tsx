"use client"

import "@blocknote/core/fonts/inter.css"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import { BlockNoteEditor, PartialBlock } from "@blocknote/core"
import { useTheme } from "next-themes"
import { uploadFiles } from "@/utils/uploadthing"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"


interface Props {
  onChange?: (content: string) => void
  initialContent?: string
  editable?: boolean
  documentId: Id<"documents">
}

const Editor = ({ initialContent, onChange, editable, documentId }: Props) => {
  const { resolvedTheme } = useTheme()
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
      uploadFile: async (file: File) => {
        const [res] = await uploadFiles("imageUploader", {files: [file]})
        return res.url
      },
  })
  console.log(editor.document.map(edit => edit.content))

  const update = useMutation(api.documents.update)

  return (
    <BlockNoteView
      className="my-4"
      editor={editor}
      editable={editable}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={() => {
        update({
          id: documentId,
          content: JSON.stringify(editor.document)
        })
      }}
    />
  )
}
export default Editor
