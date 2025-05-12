import * as React from "react"

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onCheckedChange, ...props }, ref) => (
    <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={e => onCheckedChange(e.target.checked)}
        style={{ width: 40, height: 20 }}
        {...props}
      />
      <span style={{ marginLeft: 8 }}>{checked ? 'On' : 'Off'}</span>
    </label>
  )
)
Switch.displayName = "Switch" 