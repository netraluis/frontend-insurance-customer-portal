import * as React from "react"

interface CalendarProps {
  mode?: string
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  initialFocus?: boolean
  disabled?: (date: Date) => boolean
}

export function Calendar({ selected, onSelect }: CalendarProps) {
  return (
    <input
      type="date"
      value={selected ? selected.toISOString().substring(0, 10) : ''}
      onChange={e => {
        const value = e.target.value
        onSelect && onSelect(value ? new Date(value) : undefined)
      }}
    />
  )
} 