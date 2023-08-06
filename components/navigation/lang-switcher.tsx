"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Select from "react-select";
// const LangSwitcher = ({ locale }: { locale: string }) => {
//   const getTargetLanguage = () => {
//     switch (locale) {
//       case "en":
//         return "de";
//       case "de":
//         return "zh";
//       default:
//         return "en";
//     }
//   };

//   const getFlag = (targetLanguage: string) => {
//     switch (targetLanguage) {
//       case "en":
//         return "🇬🇧";
//       case "de":
//         return "🇩🇪";
//       case "zh":
//         return "🇨🇳";
//       default:
//         return "";
//     }
//   };

//   const targetLanguage = getTargetLanguage();
//   const pathname = usePathname();
//   console.log("pathname", pathname);
//   const redirectTarget = () => {
//     if (!pathname) return "/";
//     const segments = pathname.split("/");
//     console.log("segments", segments);
//     segments[1] = targetLanguage;
//     return segments.join("/");
//   };

//   return (
//     <Link
//       className="flex items-center gap-1 font-semibold"
//       locale={targetLanguage}
//       href={redirectTarget()}
//     >
//       <span>{getFlag(targetLanguage)}</span>
//       {targetLanguage.toUpperCase()}
//     </Link>
//   );
// };


const LangSwitcher = ({ locale }: { locale: string }) => {
  const options = [
    { value: "en", label: "🇬🇧 EN" },
    { value: "de", label: "🇩🇪 DE" },
    { value: "zh", label: "🇨🇳 ZH" },
  ];

  const pathname = usePathname();
  const redirectTarget = (targetLanguage: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = targetLanguage;
    return segments.join("/");
  };

  const handleLanguageChange = (option: any) => {
    const targetLanguage = option.value;
    window.location.href = redirectTarget(targetLanguage);
  };


  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: 'none',
      backgroundColor: 'transparent',
    }),
    menu: (provided: any) => ({
      ...provided,
      border: 'none',
      backgroundColor: 'transparent',
    }),
  };


  return (
    <Select
      value={options.find((option) => option.value === locale)}
      onChange={handleLanguageChange}
      options={options}
      styles={customStyles}
    />
  );
};

export default LangSwitcher;

