"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useQuery } from "convex/react"
import { useParams } from "next/navigation"
import { useState } from "react"
import FileItem from "./FileItem"

interface Props {
  parentDocumentId?: Id<"documents">
  level?: number
}

const DocumentList = ({ parentDocumentId, level = 0 }: Props) => {
  const params = useParams()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  })

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }))
  }

  if (documents === undefined) {
    return (
      <>
        <FileItem.Skeleton level={level} />
        {level === 0 && (
          <>
            <FileItem.Skeleton level={level} />
            <FileItem.Skeleton level={level} />
          </>
        )}
      </>
    )
  }

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents?.map((document) => (
        <div key={document._id}>
          <FileItem
            document={document}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
            active={params.documentId === document._id}
          />

          {expanded[document._id] && (
            <DocumentList level={level + 1} parentDocumentId={document._id} />
          )}
        </div>
      ))}
    </>
  )
}
export default DocumentList
