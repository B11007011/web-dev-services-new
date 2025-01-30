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
  const currentLocale = pathname?.split('/')[1] || 'en';
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
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-gray-800/90 border border-gray-700/50 rounded-full hover:bg-gray-700/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 backdrop-blur-md transition-all duration-200"
      >
        <span>{languages[currentLocale as keyof typeof languages].flag}</span>
        <span>{languages[currentLocale as keyof typeof languages].shortName}</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl shadow-lg bg-gray-800/90 ring-1 ring-gray-700/50 backdrop-blur-md z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {Object.entries(languages).map(([code, { name, flag }]) => (
              <Link
                key={code}
                href={`/${code}${pathname?.replace(/^\/[a-z-]{2,5}/, '') || '/'}`}
                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200 ${
                  currentLocale === code
                    ? 'bg-gray-700/80 text-white'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                } ${code === Object.keys(languages)[0] ? 'rounded-t-xl' : ''} ${
                  code === Object.keys(languages)[Object.keys(languages).length - 1] ? 'rounded-b-xl' : ''
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