import { NextIntlClientProvider } from 'next-intl';
import { LocaleSwitcher } from "@/components/locale-switcher";
import ChatWidget from '@/components/chat-widget';

export default async function LocaleLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
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