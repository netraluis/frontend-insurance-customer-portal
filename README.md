This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
