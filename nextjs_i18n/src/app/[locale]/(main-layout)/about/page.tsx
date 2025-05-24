import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  return (
    <div>
      <h1 className="text-3xl">{t("title")}</h1>
    </div>
  );
}
