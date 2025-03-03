'use client';

import { useEffect } from 'react';

export default function DebugLocale({ locale }: { locale: string }) {
  useEffect(() => {
    console.log('Current locale:', locale);
    import(`../../messages/${locale}.json`)
      .then(module => console.log('Translation module loaded:', module))
      .catch(error => console.error('Failed to load translation:', error));
  }, [locale]);

  return null;
} 