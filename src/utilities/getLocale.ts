import de from "@/locales/de";
import en from "@/locales/en";
import { Locale } from "@/types/locale";

export default function getLocale(key: Locale) {
	switch (window.genmap?.settings.language) {
		case "en":
			return en[key];
		case "de":
			return de[key];
		default:
			return key;
	}
}
