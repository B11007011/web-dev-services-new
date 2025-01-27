export async function loadTranslations(locale: string) {
  try {
    return await import(`../../../messages/${locale}.json`);
  } catch (error) {
    console.error(`Error loading translations for ${locale}:`, error);
    // Fallback to English
    return await import(`../../../messages/en.json`);
  }
} 