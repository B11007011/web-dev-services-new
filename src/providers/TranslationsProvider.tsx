import { ReactNode } from 'react';

interface TranslationsProviderProps {
  children: ReactNode;
}

export function TranslationsProvider({ children }: TranslationsProviderProps) {
  return <>{children}</>;
} 