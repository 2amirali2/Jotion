"use client"

import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/clerk-react"
import { useConvexAuth } from "convex/react"
import { ArrowRight, Loader } from "lucide-react"
import Link from "next/link"

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  return (
    <div className="flex flex-col gap-y-4 items-center">
      <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl sm:text-5xl">
        Your ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>
      <p className="text-xl font-semibold md:text-2xl">
        Jotion is the connected workspace where
        <br />
        better, faster work happens
      </p>
      {isLoading && (
        <div className="flex items-center justify-center w-full">
          <Loader className="animate-spin h-5 w-5 mr-2" />
        </div>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button size={"sm"} className="w-fit">
            Get Jotion free <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
      {isAuthenticated && !isLoading && (
        <div>
          <Button asChild className="w-fit">
            <Link href={"/documents"}>
              Enter Jotion <ArrowRight className="h-4 w-4 ml-2"></ArrowRight>
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
export default Heading
