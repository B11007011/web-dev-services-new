'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳' }
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  return (
    <div className="flex gap-2">
      {Object.entries(languages).map(([code, { name, flag }]) => (
        <Link
          key={code}
          href={`/${code}${pathname.replace(/^\/[a-z]{2}/, '') || '/'}`}
          className="no-underline"
        >
          <Button
            variant={currentLocale === code ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <span>{flag}</span>
            <span className="hidden sm:inline">{name}</span>
          </Button>
        </Link>
      ))}
    </div>
  );
} 