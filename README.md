# Insurance Customer Portal

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Repository Overview

This project is a Next.js frontend for an insurance customer portal. The application is multilingual and uses the `next-intl` package to localize all routes.

```
/
├── app/                # Next.js app directory
│   ├── [locale]/       # Dynamic locale segment (dashboard, claim forms, etc.)
│   ├── actions/        # Server actions such as email sending
│   ├── locales-text/   # JSON translation files for each language
│   ├── globals.css     # Global Tailwind styles
│   └── layout.tsx      # Root layout applying Google fonts
├── components/         # UI and feature components
│   ├── claim/          # Multi-step claim form components (auto/general)
│   ├── chat-widget/    # In-app chat widget implementation
│   ├── ui/             # Reusable shadcn/ui components
│   └── ...             # Misc. UI pieces (cards, lists, etc.)
├── hooks/              # Custom React hooks (media queries, screen size)
├── i18n/               # next-intl configuration (routing, helpers)
├── lib/                # Utility modules (env vars, PDF generator, auth API)
├── tests/              # Playwright E2E tests
├── middleware.ts       # next-intl middleware for locale routing
├── next.config.ts      # Next.js configuration
└── tailwind.config.ts  # Tailwind configuration
```

### Internationalization

Routing is configured via `i18n/routing.ts`, listing supported locales and a default locale:

```ts
export const routing = defineRouting({
  locales: ['ca', 'fr', 'en', 'es'],
  defaultLocale: 'ca'
});
```

Every request passes through `middleware.ts` to resolve the active locale and load translations:

```ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);
```

Translations live in `app/locales-text/*.json`. Example keys:

```json
{
  "HomePage": {
    "title": "Hello world!"
  },
  "LoginPage": {
    "company": "Acme Inc"
  }
}
```

### Layouts and Pages

`app/layout.tsx` wraps the entire site with fonts and global styles:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

A secondary layout in `app/[locale]/layout.tsx` loads locale messages and shows a language switcher and chat widget:

```tsx
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = (await import(`@/app/locales-text/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div key={locale}>
        {children}
        <div className="fixed top-4 right-4 z-50">
          <LocaleSwitcher />
        </div>
        <ChatWidget />
      </div>
    </NextIntlClientProvider>
  );
}
```

### Claim Forms

Two multi-step claim forms exist: “auto” and “general.” State management is handled by React Contexts such as `ClaimFormProvider`:

```tsx
const ClaimFormContext = createContext<ClaimFormContextType | undefined>(undefined);

export function ClaimFormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return /* ... */;
      case 2:
        return /* ... */;
      default:
        return false;
    }
  };

  return (
    <ClaimFormContext.Provider value={{ formData, setFormData, currentStep, setCurrentStep }}>
      {children}
    </ClaimFormContext.Provider>
  );
}
```

Each step is a component under `components/claim/auto/steps` or `components/claim/general/general-steps`. A layout component like `ClaimFormLayout` or `GeneralClaimFormLayout` uses a stepper and navigation buttons to move through the form.

### Chat Widget

The chat feature lives in `components/chat-widget/`. `ChatWidget` sends messages (and files) to an API endpoint and renders bot replies:

```tsx
const handleSendMessage = async (content: string = inputValue) => {
  if (!content.trim() && files.length === 0) return;
  const newMessage: Message = { /* ... */ };
  setMessages((prev) => [...prev, newMessage]);

  const response = await fetch(process.env.NEXT_PUBLIC_N8N_SEND_MESSAGE!, {
    method: 'POST',
    body: formData
  });
  // ...
};
```

### Utilities and Environment

`lib/env.ts` centralizes required environment variables. A default backend URL is provided:

```ts
const DEFAULTS: Record<keyof EnvVars, string> = {
  BACKEND_URL: 'https://backend-insurance-customer-portal.onrender.com/v1'
};
```

The library also contains PDF generation helpers (`generate-pdf.ts`), authentication helpers (`auth.ts`), and a list of countries for phone inputs (`countries.ts`).

### Testing

Playwright is configured in `playwright.config.ts` and tests reside under `tests/`:

```ts
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // ...
});
```

`tests/claim-auto.spec.ts` demonstrates end-to-end interaction with the auto claim form.

**Next Steps to Explore**

1. **Run the app** – Start the development server with `npm run dev` and explore routes such as `/en/login` or `/en/claim-auto`.
2. **Translations** – Edit files in `app/locales-text/` to update text in different languages. Use `fieldCheck.js` to verify missing keys.
3. **Forms** – Review React Hook Form usage within claim form steps and how data flows through `ClaimFormProvider` and `GeneralClaimFormProvider`.
4. **PDF Generation** – See `lib/generate-pdf.ts` for how form data is converted into a downloadable PDF.
5. **Chat Widget** – Check out `components/chat-widget` to understand the chat interface and how messages are sent to the backend.
6. **Testing** – Review Playwright tests in `tests/` and adapt them to your needs.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## UI and Styling

This project uses the [`shadcn/ui`](https://ui.shadcn.com/) package to build reusable and accessible user interface components.

- **Base style:** `new-york`
- **Base color:** `zinc`
- **Icons:** [Lucide](https://lucide.dev/)
- **Configuration file:** `components.json`

You can customize styles and colors by editing the configuration in `components.json` and the color tokens in `app/globals.css`.

## End-to-End Testing with Playwright

This project uses [Playwright](https://playwright.dev/) for end-to-end (E2E) testing.

### Common Playwright Commands

- **Run all tests (headless by default):**
  ```bash
  npx playwright test
  ```

- **Run tests in headed mode (see the browser):**
  ```bash
  npx playwright test --headed
  ```
  Runs all Playwright tests with the browser UI visible. This allows you to watch the tests as they interact with your application in real time, making it easier to debug and visually verify behaviors.

- **Open the Playwright UI (visual test runner and debugger):**
  ```bash
  npx playwright test --ui
  ```

- **Pause a test for debugging (add `await page.pause()` in your test):**
  ```bash
  npx playwright test --debug
  ```

- **Use Playwright Codegen (record actions and generate test code):**
  ```bash
  npx playwright codegen http://localhost:3000/es/claim-auto
  ```
  Opens a browser at the specified URL and a Playwright Codegen window. As you interact with the page (clicks, typing, etc.), Playwright automatically generates the corresponding test code. This is ideal for quickly scaffolding E2E tests by recording real user actions.

For more information, see the [Playwright documentation](https://playwright.dev/docs/intro).

### All Playwright CLI Commands

- **Run all tests:**
  ```bash
  npx playwright test
  ```
  Runs all Playwright tests in the project (headless by default).

- **Run tests in headed mode:**
  ```bash
  npx playwright test --headed
  ```
  Runs tests with the browser UI visible.

- **Open Playwright UI (test runner):**
  ```bash
  npx playwright test --ui
  ```
  Opens the interactive Playwright test runner UI.

- **Debug tests (with inspector):**
  ```bash
  npx playwright test --debug
  ```
  Runs tests with the inspector for step-by-step debugging.

- **Record user actions and generate test code:**
  ```bash
  npx playwright codegen <url>
  ```
  Opens a browser and generates Playwright code as you interact with the page.

- **Show the last HTML test report:**
  ```bash
  npx playwright show-report
  ```
  Opens the HTML report of the last test run.

- **Install browsers required by Playwright:**
  ```bash
  npx playwright install
  ```
  Installs all supported browsers (Chromium, Firefox, WebKit).

- **Install system dependencies for browsers (Linux):**
  ```bash
  npx playwright install-deps
  ```
  Installs required system dependencies for browsers (mainly for Linux).

- **Check Playwright installation and environment:**
  ```bash
  npx playwright doctor
  ```
  Diagnoses and prints information about your Playwright setup.

- **Update Playwright browsers:**
  ```bash
  npx playwright update
  ```
  Updates the installed browsers to the latest version supported by your Playwright version.

- **Open a page in a browser (for quick manual testing):**
  ```bash
  npx playwright open <url>
  ```
  Opens the given URL in a Playwright-managed browser.

- **Take a screenshot of a page:**
  ```bash
  npx playwright screenshot <url> <file>
  ```
  Takes a screenshot of the given URL and saves it to the specified file.

- **Record a video of a page:**
  ```bash
  npx playwright video <url> <file>
  ```
  Records a video of the given URL and saves it to the specified file.

- **Open a trace file for inspection:**
  ```bash
  npx playwright trace open <trace.zip>
  ```
  Opens a Playwright trace file for interactive inspection.

For more details and advanced usage, see the [Playwright CLI documentation](https://playwright.dev/docs/test-cli).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
