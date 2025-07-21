import { NextIntlClientProvider } from 'next-intl';
import { LocaleSwitcher } from "@/components/locale-switcher";
import ChatWidget from '@/components/chat-widget';

export default async function LocaleLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = (await import(`@/app/locales-text/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div key={locale}>
        <header className="border-b border-zinc-200 bg-white">
          <div className="px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="mr-3">
                <img
                  src="/globalrisc_2.svg"
                  alt="Globalrisc Logo"
                  className="h-12 w-auto"
                />
              </div>
              <LocaleSwitcher />
            </div>
          </div>
        </header>
        <div className="mb-4">
          {children}
        </div>
        <ChatWidget />
      </div>
    </NextIntlClientProvider>
  );
}