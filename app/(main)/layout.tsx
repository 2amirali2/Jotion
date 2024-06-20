"use client"

import { useConvexAuth } from "convex/react"
import { Loader } from "lucide-react"
import { redirect } from "next/navigation"
import Navigation from "./_components/Navigation"
import { Toaster } from 'sonner'


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-screen dark:bg-[#1F1F1F]">
        <Loader className="animate-spin h-6 w-6" />
      </div>
    )
  }

  if (!isAuthenticated) {
    redirect("/")
  }
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Toaster position="bottom-center" />
      <Navigation />
      <main className="flex-1 h-screen overflow-y-auto">{children}</main>
    </div>
  )
}
export default MainLayout
