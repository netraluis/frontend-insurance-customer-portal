import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "../components/chat-widget/index";


// fetch("http://localhost:3000/widget-bundle.css")
//   .then(res => res.text())
//   .then(css => {
//     // console.log("CSS length:", css.length);
//     // console.log("First 200 chars:", css.slice(0, 200));
//     // Encuentra el script que cargó el widget
//     function getWidgetScriptTag() {
//       const scripts = document.getElementsByTagName("script");
//       for (let i = 0; i < scripts.length; i++) {
//         if (scripts[i].src && scripts[i].src.includes("widget.js")) {
//           return scripts[i];
//         }
//       }
//       return null;
//     }

//     const scriptTag = getWidgetScriptTag();
//     const lang = scriptTag?.getAttribute("data-lang") || "es";

//     const container = document.createElement("div");
//     container.id = "my-chat-widget-root";
//     document.body.appendChild(container);

//     const shadow = container.attachShadow ? container.attachShadow({ mode: "open" }) : container;

//     console.log("CSS length:", css.length);
//     console.log("First 200 chars:", css.slice(0, 200));

//     // 1. Inyecta el CSS de Tailwind
//     const style = document.createElement("style");
//     style.textContent = css;
//     shadow.appendChild(style);


//     // 2. Copia las variables CSS de :root al shadow root
//     const rootVars = getComputedStyle(document.documentElement);
//     const styleVars = document.createElement("style");
//     let cssVars = ":host, :root {";
//     for (let i = 0; i < rootVars.length; i++) {
//       const name = rootVars[i];
//       if (name.startsWith("--")) {
//         cssVars += `${name}: ${rootVars.getPropertyValue(name)};`;
//       }
//     }
//     cssVars += "}";
//     styleVars.textContent = cssVars;
//     shadow.appendChild(styleVars);

//     // 3. Monta el widget 
//     const mountPoint = document.createElement("div");
//     shadow.appendChild(mountPoint);
//     ReactDOM.createRoot(mountPoint).render(<ChatWidget lang={lang} />);
//   });


Promise.all([
  fetch("http://localhost:3000/widget-bundle.css").then(res => res.text())
]).then(([css1]) => {

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



  // const styleVars = document.createElement("style");
  // styleVars.textContent = `:host, :root { --radius: 0.75rem; }`;
  // shadow.appendChild(styleVars);

  // Inyecta ambos CSS
  const style1 = document.createElement("style");
  console.log(css1.includes("bg-red-500"));
  console.log(css1.includes("rounded-xl"));
  style1.textContent = css1;
  shadow.appendChild(style1);


  // 2. Copia las variables CSS de :root al shadow root
  // const rootVars = getComputedStyle(document.documentElement);
  // const styleVars = document.createElement("style");
  // let cssVars = ":host, :root {";
  // for (let i = 0; i < rootVars.length; i++) {
  //   const name = rootVars[i];
  //   if (name.startsWith("--")) {
  //     cssVars += `${name}: ${rootVars.getPropertyValue(name)};`;
  //   }
  // }
  // cssVars += "}";
  // styleVars.textContent = cssVars;
  // shadow.appendChild(styleVars);

  // 3. Monta el widget 
  const mountPoint = document.createElement("div");
  shadow.appendChild(mountPoint);
  ReactDOM.createRoot(mountPoint).render(<ChatWidget lang={lang} />);
});