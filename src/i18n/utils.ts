import fr from './fr.json';
import de from './de.json';

export const languages = {
  fr: 'Français',
  de: 'Deutsch',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'fr';

const translations = { fr, de } as const;

/**
 * Returns a `t` function that resolves dot-separated keys against the
 * translation JSON for the given language (e.g. `t('hero.title')`).
 * Falls back to the default language, then to the raw key if missing.
 */
export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return (
      resolve(translations[lang], key) ??
      resolve(translations[defaultLang], key) ??
      key
    );
  };
}

/** Returns the full translation object for a language (for arrays/lists). */
export function getTranslations(lang: Lang) {
  return translations[lang];
}

function resolve(obj: unknown, key: string): string | undefined {
  const value = key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
  return typeof value === 'string' ? value : undefined;
}

/** getStaticPaths helper: one entry per supported language. */
export function getLangStaticPaths() {
  return (Object.keys(languages) as Lang[]).map((lang) => ({
    params: { lang },
  }));
}

/**
 * Builds a localized URL for a page path (without locale prefix),
 * e.g. localizePath('de', 'impressum') -> '/de/impressum'.
 */
export function localizePath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return clean ? `/${lang}/${clean}` : `/${lang}/`;
}
