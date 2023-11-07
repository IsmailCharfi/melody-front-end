export enum Languages {
  fr = "fr",
  de = "de",
  en = "en",
}

export function isFrench(lang: string) {
  return lang === Languages.fr;
}

export function isGerman(lang: string) {
  return lang === Languages.de;
}

export function isEnglish(lang: string) {
  return lang === Languages.en;
}
