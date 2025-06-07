import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
const getTranslations = async (locale: string) => {
  const response = await fetch(
    `http://localhost:3000/translations/${locale}.json`
  );
  return response.json();
};
export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const translations = await getTranslations(locale);

  return {
    locale,
    // messages: (await import(`../translations/${locale}.json`)).default,
    messages: translations,
  };
});
