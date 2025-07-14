# Chat Widget Embebible — Guía Paso a Paso

## 1. Instalación de dependencias necesarias

```sh
npm install -D tailwindcss @tailwindcss/cli esbuild react react-dom
```

> **Nota:** Si usas Tailwind v4+, necesitas instalar el CLI aparte: `@tailwindcss/cli`.

---

## 2. Estructura de archivos recomendada

```
frontend-insurance-customer-portal/
  components/
    chat-widget/
      index.tsx
      locales.ts
      ...
  widget/
    entry.tsx
    widget.css
  public/
    widget.js
    widget-bundle.css
```

---

## 3. Crear el entrypoint del widget

`widget/entry.tsx`:

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import ChatWidget from "../components/chat-widget/index";

fetch("/widget-bundle.css")
  .then(res => res.text())
  .then(css => {
    // Encuentra el <script> que cargó el widget
    function getWidgetScriptTag() {
      const scripts = document.getElementsByTagName("script");
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src && scripts[i].src.includes("widget.js")) {
          return scripts[i];
        }
      }
      return null;
    }

    const scriptTag = getWidgetScriptTag();
    const lang = scriptTag?.getAttribute("data-lang") || "es";

    const container = document.createElement("div");
    container.id = "my-chat-widget-root";
    document.body.appendChild(container);

    const shadow = container.attachShadow ? container.attachShadow({ mode: "open" }) : container;

    const style = document.createElement("style");
    style.textContent = css;
    shadow.appendChild(style);

    const mountPoint = document.createElement("div");
    shadow.appendChild(mountPoint);
    createRoot(mountPoint).render(<ChatWidget lang={lang} />);
  });
```

---

## 4. Pasar datos del script al componente bundleado

En el HTML donde insertes el widget:

```html
<script src="/widget.js" data-lang="ca"></script>
```

En el entrypoint, el valor de `data-lang` se recoge así:

```js
const scriptTag = getWidgetScriptTag();
const lang = scriptTag?.getAttribute("data-lang") || "es";
```

Y se pasa como prop al componente:

```js
createRoot(mountPoint).render(<ChatWidget lang={lang} />);
```

Puedes añadir más atributos (`data-...`) y recogerlos igual.

---

## 5. Crear el CSS para el widget

1. Crea `widget/widget.css`:

aqui he copiado los estilos de global.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
/* Aquí puedes añadir overrides o estilos custom solo para el widget */
```

2. Genera el CSS minificado para el widget:

```sh
npx tailwindcss -i ./widget/widget.css -o ./public/widget-bundle.css
```

al crear widget-bundle.css añadele las variables que son 
```
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.141 0.005 285.823);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.21 0.006 285.885);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.967 0.001 286.375);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  --muted: oklch(0.967 0.001 286.375);
  --muted-foreground: oklch(0.552 0.016 285.938);
  --accent: oklch(0.967 0.001 286.375);
  --accent-foreground: oklch(0.21 0.006 285.885);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.92 0.004 286.32);
  --input: oklch(0.92 0.004 286.32);
  --ring: oklch(0.705 0.015 286.067);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.141 0.005 285.823);
  --sidebar-primary: oklch(0.21 0.006 285.885);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.967 0.001 286.375);
  --sidebar-accent-foreground: oklch(0.21 0.006 285.885);
  --sidebar-border: oklch(0.92 0.004 286.32);
  --sidebar-ring: oklch(0.705 0.015 286.067);
}
```
Y mira si te faltan clases dinamicas 
## 🛠️ Script para detectar clases usadas pero no presentes en el CSS (safelist helper)

A veces Tailwind purga clases dinámicas que sí usas en tu widget pero no aparecen como string literal en el código fuente. Este script te ayuda a detectar qué clases están en uso en el DOM pero no están presentes en el CSS generado (útil para rellenar la `safelist`).

### **Cómo usarlo**

1. **Saca todas las clases usadas en tu widget**

```js
// 1. Saca todas las clases usadas en los nodos del shadow root
const root = document.querySelector('YOUR_WIDGET_SELECTOR').shadowRoot;
const usedClasses = new Set();
root.querySelectorAll('*').forEach(el => {
  if (typeof el.className === 'string') {
    el.className.split(/\s+/).forEach(cls => cls && usedClasses.add(cls));
  }
});
console.log('Clases usadas:', [...usedClasses]);
```

2. **Saca todas las clases presentes en el CSS del shadow root**

```js
// 2. Saca todas las clases definidas en los <style> del shadow root
const styles = Array.from(root.querySelectorAll('style'));
const cssText = styles.map(s => s.textContent).join('\n');
const cssClasses = new Set(
  [...cssText.matchAll(/\.([a-zA-Z0-9\-\_\[\]\:\/\\]+)[\s,{]/g)].map(m => m[1])
);
console.log('Clases en CSS:', [...cssClasses]);
```

3. **Detecta y resalta las clases faltantes**

```js
// 3. Pinta de magenta los elementos con clases que faltan en el CSS
document.querySelectorAll('*').forEach(el => {
  if (typeof el.className === 'string') {
    el.className.split(/\s+/).forEach(cls => {
      if (cls && !cssClasses.has(cls)) {
        el.style.outline = '2px solid magenta';
        console.warn('Clase faltante en CSS:', cls, el);
      }
    });
  }
});
```

> **Tip:** Puedes usar esto en la consola del navegador para depurar tu widget embebido y construir una safelist precisa para Tailwind.

---

## 6. Bundlear el widget con esbuild

Crea `build-widget.js`:

```js
require("esbuild")
  .build({
    entryPoints: ["widget/entry.tsx"],
    bundle: true,
    outfile: "public/widget.js",
    minify: true,
    format: "iife",
    target: ["es2017"],
    loader: { ".tsx": "tsx", ".ts": "ts", ".css": "css" },
    define: {
      // Aquí puedes inyectar variables públicas si necesitas
    },
  })
  .catch(() => process.exit(1));
```

---

## Añadir las variables de entorno en 

```sh 
export NEXT_PUBLIC_SUPABASE_URL="ttps://zjdkdciozjzzlfxnnhdz.supabase.co" 
 export NEXT_PUBLIC_N8N_SEND_MESSAGE="https://theagentslab.app.n8n.cloud/webhook/8eb539ae-0829-441d-b416-9e8d6befbe52"
 export NEXT_PUBLIC_SUPABASE_URL="https://zjdkdciozjzzlfxnnhdz.supabase.co" 
 export NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZGtkY2lvemp6emxmeG5uaGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzE5MDgsImV4cCI6MjA2NDAwNzkwOH0.lMVA20kRFxSewjuo2Ilb6NCsey9wlislF4OixZBFl-w"
 export NEXT_PUBLIC_MAIN_URL="http://localhost:3000/" 
 node build-widget.js 
 ```

---

## 7. Usar el widget en cualquier web

En el HTML de destino:

```html
<script src="/widget.js" data-lang="es"></script>
```

El widget aparecerá flotante, con idioma y estilos correctos, y aislado del resto de la web.

---

## 8. Notas y tips

- **No necesitas rebuild para cambiar el idioma:** solo cambia el atributo `data-lang` y recarga la página.
- Puedes pasar más datos vía atributos `data-...` y recogerlos igual en el entrypoint.
- El CSS debe ser específico para el widget para evitar conflictos y optimizar el tamaño.
- Si usas otros assets (imágenes, fuentes), ponlos en `/public` y referencia con rutas relativas.

---

**¡Listo!**
Tu widget es portable, aislado, y fácil de mantener.
