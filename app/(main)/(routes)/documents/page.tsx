/* eslint-disable react/no-unescaped-entities */
"use client"

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/clerk-react"
import { useMutation } from "convex/react"
import { PlusCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const DocumentPage = () => {
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


  const { user } = useUser()
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <Image src={"/empty.webp"} alt="empty" width={300} height={300} className="object-contain dark:hidden" />
      <Image src={"/empty-dark.webp"} alt="empty" width={300} height={300} className="object-contain hidden dark:block" />
        <p className="text-lg font-semibold">
        Welcome to {user?.fullName}'s Jotion
        </p>
        <Button asChild onClick={onCreate}>
          <Link href={"/documents"}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create a note
          </Link>
        </Button>
    </div>
  )
}
export default DocumentPage