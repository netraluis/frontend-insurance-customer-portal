"use client";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {Globe} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {usePathname} from 'next/navigation';

const locales = [
  { code: 'ca', label: 'Català' },
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' }
];

export function LocaleSwitcher() {
  const pathname = usePathname();

  // Quita el primer segmento si es un locale
  const pathWithoutLocale = pathname.replace(/^\/(ca|es|en|fr)/, '');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change language">
          <Globe className="h-5 w-5 text-zinc-700" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {locales.map(locale => (
          <DropdownMenuItem asChild key={locale.code}>
            <Link href={`/${pathWithoutLocale}`} locale={locale.code} prefetch={false}>
              {locale.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 