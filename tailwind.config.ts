import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class", "media"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  safelist: [
    "fixed",
    "transition-all",
    "inset-0",
    "z-50",
    "bg-white",
    "bottom-0",
    "right-0",
    "left-0",
    "right-4",
    "flex",
    "flex-col",
    "items-end",
    "safe-area-bottom",
    "mb-20",
    "w-full",
    "h-full",
    "mb-4",
    "rounded-full",
    "h-10",
    "w-10",
    "bg-zinc-950",
    "text-white",
    "hover:bg-zinc-800",
    "shadow-lg",
    "bottom-8",
    // "size-icon", // solo si existe en tu config
    "bg-red-500",

      // Layout & containers
  "flex",
  "flex-col",
  "w-full",
  "rounded-xl",
  "border",
  "border-zinc-200",
  "bg-white",
  "shadow-lg",
  "overflow-hidden",
  "bg-red-500",

  // Heights (condicionales y arbitrarias)
  "h-[calc(100vh-56px)]",
  "h-auto",
  "min-h-[50vh]",
  "h-[85vh]",
  "h-[80vh]",
  "h-[75vh]",
  "h-[650px]",
  "max-h-[35vh]",
  "max-h-[40vh]",

  // Header
  "items-center",
  "justify-between",
  "p-4",
  "border-b",

  // Avatar
  "gap-3",
  "h-10",
  "w-10",
  "bg-zinc-950",
  "font-semibold",
  "text-ml",

  // Button (header close)
  "rounded-full",

  // Messages
  "flex-1",
  "p-5",
  "overflow-y-auto",

  // Skeleton (loading)
  "items-start",
  "gap-3",
  "mb-4",
  "h-8",
  "w-8",
  "mt-1",
  "flex-col",
  "gap-2",
  "max-w-[80%]",
  "h-4",
  "w-24",
  "w-40",
  "w-32",

  // Chat starters
  "px-2",
  "py-0",
  "text-xs",
  "text-zinc-500",
  "mb-0",

  // Files preview
  "px-4",
  "py-2",
  "border-t",
  "flex-wrap",
  "gap-2",
  "gap-1",
  "bg-zinc-100",
  "py-1",
  "rounded",
  "text-xs",
  "truncate",
  "max-w-[100px]",
  "text-zinc-500",
  "hover:text-zinc-700",

  // Input area
  "p-3",
  "sticky",
  "bottom-0",
  "z-10",
  "rounded-lg",
  "px-2",
  "py-2",
  "resize-none",
  "outline-none",
  "text-sm",
  "max-h-24",
  "min-h-[26px]",
  "placeholder:text-zinc-500",
  "shrink-0",
  "h-10",
  "w-10",
  "h-8",
  "w-8",
  "rounded-ml",
  "bg-zinc-950",
  "hover:bg-zinc-800",
  "h-6",
  "w-6",
  "h-5",
  "w-5",
  "h-4",
  "w-4",
  "text-zinc-400",
  "text-center",
  "mt-3",

  // Others (from conditional rendering)
  "flex-end",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "slide-in": "slide-in 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 

export default config
