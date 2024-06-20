"use client"

import { ModeToggle } from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import { SignInButton, UserButton } from "@clerk/clerk-react"
import { useConvexAuth } from "convex/react"
import { Loader } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  return (
    <div className="flex w-full bg-background dark:bg-[#1F1F1F] items-center justify-between p-6 border-b fixed top-0 z-50">
      <div className="md:flex items-center gap-2 hidden">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={40}
          height={40}
          className="dark:hidden"
        />
        <Image
          src={"/logo-dark.svg"}
          alt="logo"
          width={40}
          height={40}
          className="hidden dark:block"
        />
        <p className="font-semibold">Jotion</p>
      </div>
      <div className="flex items-center gap-x-3 w-full justify-between md:justify-end">
        {isLoading && (
          <div>
            <Loader className="animate-spin h-4 w-4 mr-2" />
          </div>
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"sm"}>
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Get Jotion free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button asChild variant={"ghost"} size={"sm"}>
              <Link href={"/documents"}>Enter Jotion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  )
}
export default Navbar
