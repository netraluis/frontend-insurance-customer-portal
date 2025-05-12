import * as React from "react"

export const PopoverContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
} | null>(null)

export function Popover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div style={{ display: 'inline-block', position: 'relative' }}>{children}</div>
    </PopoverContext.Provider>
  )
}

export function PopoverTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  const ctx = React.useContext(PopoverContext)
  if (!ctx) return null
  if (React.isValidElement(children)) {
    const child = children as React.ReactElement<any>
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        if (child.props.onClick) child.props.onClick(e)
        ctx.setOpen(!ctx.open)
      },
    })
  }
  return null
}

export function PopoverContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(PopoverContext)
  if (!ctx || !ctx.open) return null
  return (
    <div className={className} style={{ position: 'absolute', zIndex: 10, background: 'white', border: '1px solid #ccc', padding: 8 }}>
      {children}
    </div>
  )
} 