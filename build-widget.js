require('dotenv').config();
// build-widget.js
require("esbuild")
  .build({
    entryPoints: ["widget/entry.tsx"],
    bundle: true,
    outfile: "public/widget.js",
    minify: false,
    format: "iife",
    target: ["es2017"],
    external: [], // Si quieres incluir todo en el bundle
    loader: { ".tsx": "tsx", ".ts": "ts", ".css": "css" },
    define: {
      "process.env.NEXT_PUBLIC_SUPABASE_URL":
        JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_URL),
      "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY":
        JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      "process.env.NEXT_PUBLIC_N8N_SEND_MESSAGE":
        JSON.stringify(process.env.NEXT_PUBLIC_N8N_SEND_MESSAGE),
      "process.env.NEXT_PUBLIC_MAIN_URL":
        JSON.stringify(process.env.NEXT_PUBLIC_MAIN_URL),
    },
  })
  .catch(() => process.exit(1));
