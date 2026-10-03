import { translations, type TranslationKey } from '@/i18n/translations';
import { useFlashEatStore } from '@/features/flasheat/store/flasheat-store';
import type { Language } from '@/features/flasheat/types/flasheat';

type Vars = Record<string, string | number>;

export function translate(language: Language, key: TranslationKey, vars?: Vars): string {
  const raw: string = translations[language][key] ?? translations.en[key];
  if (!vars) return raw;
  return Object.entries(vars).reduce((text, [k, v]) => text.split(`{${k}}`).join(String(v)), raw);
}

export function useT() {
  const language = useFlashEatStore((s) => s.session.language);
  const t = (key: TranslationKey, vars?: Vars) => translate(language, key, vars);
  return { t, language };
}

/** Primary (larger) and secondary (smaller) name for bilingual data, by current language. */
export function useNames() {
  const language = useFlashEatStore((s) => s.session.language);
  return (item: { nameEn: string; nameZh: string }) =>
    language === 'zh'
      ? { primary: item.nameZh, secondary: item.nameEn }
      : { primary: item.nameEn, secondary: item.nameZh };
}
