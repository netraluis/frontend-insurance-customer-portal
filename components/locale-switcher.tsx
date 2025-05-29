"use client";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {Globe} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';
import { useLocale } from 'next-intl';

const locales = [
  { code: 'ca', label: 'Català' },
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' }
];

export function LocaleSwitcher() {
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(ca|es|en|fr)/, '');
  const locale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change language">
          <Globe className="h-5 w-5 text-zinc-700" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {locales.map(lo => (
          <DropdownMenuItem asChild key={lo.code}>
            <Link  className={clsx(
              'flex items-center gap-2 px-6 py-3 text-lg font-normal cursor-pointer transition',
              lo.code === locale
                ? 'bg-zinc-100 text-zinc-900 font-semibold'
                : 'hover:bg-zinc-50 text-zinc-700'
            )}href={`/${pathWithoutLocale}`} locale={lo.code} prefetch={false}>
              {lo.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 