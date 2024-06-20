/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { cn } from "@/lib/utils"
import { ChevronsLeft, MenuIcon, Plus, PlusCircle } from "lucide-react"
import { useParams, usePathname } from "next/navigation"
import { ElementRef, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import UserItem from "./UserItem"
import SearchItem from "./SearchItem"
import SettingsItem from "./SettingsItem"
import AddPageItem from "./AddPageItem"
import TrashItem from "./TrashItem"
import DocumentList from "./DocumentList"
import Toolbar from "./Title"
import { Button } from "@/components/ui/button"
import Navbar from "./Navbar"

const Navigation = () => {
  const pathname = usePathname()
  const isResizingRef = useRef(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const sidebarRef = useRef<ElementRef<"aside">>(null)
  const navbarRef = useRef<ElementRef<"div">>(null)
  const [isResetting, setIsResetting] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(isMobile)
  const parmas = useParams()

  useEffect(() => {
    if (isMobile) {
      collapse()
    } else {
      resetWidth()
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) {
      collapse()
    }
  }, [pathname, isMobile])

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    isResizingRef.current = true
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return

    let newWidth = e.clientX

    if (newWidth < 240) {
      newWidth = 240
    }
    if (newWidth > 480) {
      newWidth = 480
    }
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty("left", `${newWidth}px`)
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
    }
  }
  const handleMouseUp = () => {
    isResizingRef.current = false

    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)
      setIsResetting(true)

      sidebarRef.current.style.width = isMobile ? "100%" : "240px"
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      )
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px")
      setTimeout(() => {
        setIsResetting(false)
      }, 300)
    }
  }

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true)
      setIsResetting(true)

      sidebarRef.current.style.width = "0"
      navbarRef.current.style.setProperty("width", "100%")
      navbarRef.current.style.setProperty("left", "0")
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  return (
    <>
      <aside
        className={cn(
          "group/sidebar flex flex-col overflow-y-auto relative w-60 bg-secondary z-[99999] line-clamp-1",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
        ref={sidebarRef}
      >
        <div
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
          role="button"
          onClick={collapse}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <SearchItem />
          <SettingsItem />
          <AddPageItem label="New page" icon={PlusCircle} />
        </div>
        <div className="mt-4">
          <DocumentList />
          <AddPageItem label="Add a page" icon={Plus} />
        </div>
        <TrashItem isMobile={isMobile} />

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!parmas.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (

          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
              className="h-6 w-6 text-muted-foreground"
              role="button"
              onClick={resetWidth}
              />
            )}
          </nav>
            )}
        </div>
    </>
  )
}
export default Navigation
