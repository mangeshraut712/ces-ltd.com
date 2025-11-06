import i18next, { type i18n as I18nInstance } from 'i18next';

const defaultNamespace = 'translation';

export const supportedLanguages = [
  { code: 'en', label: 'English', country: 'USA' },
  { code: 'ja', label: '日本語', country: 'Japan' },
  { code: 'hi', label: 'हिन्दी', country: 'India' },
  { code: 'es', label: 'Español', country: 'Mexico' },
  { code: 'fr', label: 'Français', country: 'Canada' },
  { code: 'nl', label: 'Nederlands', country: 'Netherlands' },
  { code: 'ar', label: 'العربية', country: 'UAE' },
  { code: 'vi', label: 'Tiếng Việt', country: 'Vietnam' },
];

let instance: I18nInstance | null = null;

export function getI18nInstance() {
  if (!instance) {
    instance = i18next.createInstance();
    instance.init({
      fallbackLng: 'en',
      lng: 'en',
      defaultNS: defaultNamespace,
      ns: [defaultNamespace],
      interpolation: {
        escapeValue: false,
      },
      keySeparator: false,
      returnNull: false,
      initImmediate: false,
      resources: {
        en: {
          [defaultNamespace]: {},
        },
      },
    });
  }

  return instance;
}

export function hasLanguageResources(lang: string) {
  const i18n = getI18nInstance();
  return i18n.hasResourceBundle(lang, defaultNamespace);
}

export function addLanguageResources(lang: string, entries: Record<string, string>) {
  const i18n = getI18nInstance();
  if (Object.keys(entries).length === 0) {
    return;
  }
  i18n.addResourceBundle(lang, defaultNamespace, entries, true, true);
}

export function changeLanguage(lang: string) {
  const i18n = getI18nInstance();
  return i18n.changeLanguage(lang);
}

export const namespace = defaultNamespace;
