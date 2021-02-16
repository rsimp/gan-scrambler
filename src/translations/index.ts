import pathParse from "path-parse";
import { importAll } from "core/utils/webpack";

interface Translations {
  [key: string]: string | Translations;
}

// import json translations
const translations = importAll<Translations>(
  require.context("../", true, /\/translations\/.*\.json$/)
);

const flattenTranslations = (trans: Translations, keys: string[] = []) =>
  Object.keys(trans).reduce((acc, key) => {
    const currentKeys = [...keys, key];
    const value = trans[key];
    if (typeof value === "object")
      acc = { ...acc, ...flattenTranslations(value, currentKeys) };
    else acc[currentKeys.join(".")] = value;
    return acc;
  }, {} as Record<string, string>);

// merge translation files with the same locale
const messageMap = Object.keys(translations).reduce((acc, filepath) => {
  const locale = pathParse(filepath).name;
  acc[locale] = {
    ...acc[locale],
    ...flattenTranslations(translations[filepath]),
  };
  return acc;
}, {} as Record<string, Record<string, string>>);

const setLanguageDefault = (languageCode: string, preferredLocale: string) => {
  const languageMessages = Object.keys(messageMap).filter((locale) =>
    locale.toLocaleLowerCase().startsWith(languageCode)
  );
  if (languageMessages.length > 0 && !messageMap[languageCode]) {
    if (languageMessages.includes(preferredLocale)) {
      messageMap[languageCode] = messageMap[preferredLocale];
    } else {
      messageMap[languageCode] = messageMap[languageMessages[0]];
    }
  }
};

setLanguageDefault("en", "en-us");
setLanguageDefault("es", "es-mx");

let locale = navigator.language;
let messages = messageMap[locale.toLowerCase()];
if (!messages) {
  locale = "en-US";
  messages = messageMap[locale.toLowerCase()];
}

export { locale, messages };
