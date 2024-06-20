"use client"

import { ModeToggle } from "@/components/ModeToggle"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Settings } from "lucide-react"
import { useState } from "react"

const SettingsItem = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        className="flex items-center cursor-pointer hover:bg-primary/5 py-1 text-sm text-muted-foreground font-medium"
        role="button"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center px-3 text-muted-foreground gap-x-2">
          <Settings className="h-4 w-4" />
          <p>Settings</p>
        </div>
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>My settings</DialogTitle>
            <DialogDescription>
              <hr className="my-2" />
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-sm font-medium">Appearance</h2>
              <p className="text-xs text-muted-foreground">
                Customize how Jotion looks on your device
              </p>
            </div>
            <ModeToggle />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default SettingsItem
