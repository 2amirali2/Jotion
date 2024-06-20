"use client"

import { File, Search } from "lucide-react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"

const SearchItem = () => {
  const [open, setOpen] = useState(false)
  const documents = useQuery(api.documents.getSearch)

  const { user } = useUser()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  
  return (
    <>
      <div
        className="relative cursor-pointer flex items-center hover:bg-primary/5 py-1 text-sm text-muted-foreground font-medium"
        role="button"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center px-3 text-muted-foreground gap-x-2">
          <Search className="h-4 w-4" />
          <p>Search</p>
          <div className="absolute right-3 ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs text-muted-foreground">⌘</span>K
          </div>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={`Search ${user?.fullName}'s Jotion...`} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Documents">
            {documents?.map((document) => (
              <CommandItem
                key={document._id}
                value={`${document._id}-${document.title}`}
                title={document.title}
              >
                <Link
                  href={`/documents/${document._id}`}
                  className="cursor-pointer flex items-center"
                >
                  {document.icon ? (
                    <p>{document.icon}</p>
                  ) : (
                    <File className="h-4 w-4 text-muted-foreground mr-2" />
                  )}
                  <h2>{document.title}</h2>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
export default SearchItem
