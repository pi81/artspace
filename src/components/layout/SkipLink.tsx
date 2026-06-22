import { t } from "@/lib/i18n/t";

export function SkipLink() {
  return (
    <a href="#content" className="skip-link">
      {t("Skip to content")}
    </a>
  );
}
