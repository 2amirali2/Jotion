/* eslint-disable react/no-unescaped-entities */
"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignOutButton, useUser } from "@clerk/clerk-react"
import { ChevronsUpDown } from "lucide-react"

const UserItem = () => {
  const { user } = useUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
          <div className="flex items-center gap-x-2 max-w-[150px]">
            <Avatar className="h-5 w-5">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.fullName}'s Jotion
            </span>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground ml-2" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        forceMount
        align="start"
        alignOffset={8}
        className="w-80"
      >
        <div className="flex flex-col gap-y-2">
          <p className="text-xs text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center">
            <div className="rounded-md p-1 bg-secondary">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <span className="text-start font-medium line-clamp-1 text-sm ml-2">
                {user?.fullName}'s Jotion
              </span>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="text-muted-foreground w-full">
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserItem
