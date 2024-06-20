"use client"

import Cover from "@/components/Cover"
import Editor from "@/components/Editor"
import Toolbar from "@/components/Toolbar"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import dynamic from "next/dynamic"
import { useMemo } from "react"


const PreviewDocumentIdPage = ({
  params,
}: {
  params: { documentId: Id<"documents"> }
}) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor")), []
  )

  const update = useMutation(api.documents.update)
  const document = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId,
  })

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    })
  }

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    )
  }

  if(document === null) {
    return (
      <div>Not found.</div>
    )
  }
  return (
    <div className="pb-36 w-full">
      <Cover url={document.coverImage} documentId={document._id} preview />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">        <Toolbar documentData={document} preview />
        <Editor initialContent={document.content} onChange={onChange} documentId={document._id} editable={false}  />
      </div>
    </div>
  )
}
export default PreviewDocumentIdPage
