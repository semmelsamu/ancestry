import locale from "@/locales/en";

export type Locale = keyof typeof locale;

export type SupportedLocale = "en" | "de";
