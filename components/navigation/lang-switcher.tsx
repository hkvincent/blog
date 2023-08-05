"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const LangSwitcher = ({ locale }: { locale: string }) => {
  const getTargetLanguage = () => {
    switch (locale) {
      case "en":
        return "de";
      case "de":
        return "zh";
      default:
        return "en";
    }
  };

  const getFlag = (targetLanguage: string) => {
    switch (targetLanguage) {
      case "en":
        return "🇬🇧";
      case "de":
        return "🇩🇪";
      case "zh":
        return "🇨🇳";
      default:
        return "";
    }
  };

  const targetLanguage = getTargetLanguage();
  const pathname = usePathname();
  console.log("pathname", pathname);
  const redirectTarget = () => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    console.log("segments", segments);
    segments[1] = targetLanguage;
    return segments.join("/");
  };

  return (
    <Link
      className="flex items-center gap-1 font-semibold"
      locale={targetLanguage}
      href={redirectTarget()}
    >
      <span>{getFlag(targetLanguage)}</span>
      {targetLanguage.toUpperCase()}
    </Link>
  );
};

export default LangSwitcher;
