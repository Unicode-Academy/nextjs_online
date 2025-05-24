import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1 className="text-3xl">{t("title")}</h1>
    </div>
  );
}
