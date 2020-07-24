import pathParse from "path-parse";
import { importAll } from "app/common/webpack";

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

export const locale = navigator.language;
export const messages = messageMap[locale.toLowerCase()];
