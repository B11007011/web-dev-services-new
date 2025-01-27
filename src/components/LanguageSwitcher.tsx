'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const languages = {
  en: { name: 'English', flag: '🇺🇸', shortName: 'US' },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳', shortName: 'VN' },
  'zh-TW': { name: '繁體中文', flag: '🇹🇼', shortName: 'TW' }
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <span>{languages[currentLocale as keyof typeof languages].flag}</span>
        <span>{languages[currentLocale as keyof typeof languages].shortName}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {Object.entries(languages).map(([code, { name, flag }]) => (
              <Link
                key={code}
                href={`/${code}${pathname.replace(/^\/[a-z-]{2,5}/, '') || '/'}`}
                className={`flex items-center gap-3 px-4 py-2 text-sm ${
                  currentLocale === code
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                <span>{flag}</span>
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 