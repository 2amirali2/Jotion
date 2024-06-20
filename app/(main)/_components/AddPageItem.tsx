"use client"

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { toast } from "sonner";


interface Props {
    label: string;
    icon: LucideIcon
}

const AddPageItem = ({ label, icon: Icon }: Props) => {
  const router = useRouter()
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const promise = create({
      title: "Untitled"
    })
    .then((documentId) => router.push(`/documents/${documentId}`))

    toast.promise(promise, {
      loading: "Creating a note...",
      success: "Note Created",
      error: "Failed to Creating a note",
    })
  }
  return (
    <div className="flex items-center hover:bg-primary/5 py-1 cursor-pointer text-sm text-muted-foreground font-medium" role="button" onClick={onCreate}>
      <div className="flex items-center px-3 text-muted-foreground gap-x-2">
        <Icon className="h-4 w-4" />
        <p>{label}</p>
      </div>
    </div>
  )
}
export default AddPageItem