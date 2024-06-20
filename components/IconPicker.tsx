"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTheme } from "next-themes"
import EmojiPicker, { Theme } from "emoji-picker-react"

interface Props {
  onChange: (icon: string) => void
  children: React.ReactNode
  asChild?: boolean
}
const IconPicker = ({ children, onChange, asChild }: Props) => {
  const { resolvedTheme } = useTheme()
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  }

  const theme = themeMap[currentTheme]
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  )
}
export default IconPicker
