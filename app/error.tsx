"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const Error = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <Image
        src={"/error.webp"}
        alt="Error"
        height={300}
        width={300}
        className="dark:hidden"
      />
      <Image
        src={"/error-dark.webp"}
        alt="Error"
        height={300}
        width={300}
        className="hidden dark:block"
      />
      <h2 className="text-xl font-medium">Something went wrong</h2>
      <Button asChild>
        <Link href={"/"}>Go back</Link>
      </Button>
    </div>
  )
}
export default Error
