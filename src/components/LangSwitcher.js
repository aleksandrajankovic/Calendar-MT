// src/components/LangSwitcher.js
"use client";

const LANG_META = {
  en: {
    flag: "/img/en.svg",
    alt: "English",
    label: "EN",
  },
};

export default function LangSwitcher({ lang = "en" }) {
  const activeMeta = LANG_META.en;

  return (
    <div className="block relative z-30">
      <div
        className="
          flex items-center justify-center
          w-[38px] h-[38px]
          bg-[#284755]/50
          border border-[#396F85]/40
          shadow-[0_8px_24px_rgba(0,0,0,0.6)]
          backdrop-blur-sm
          rounded-[6px]
        "
        aria-label="Language: English"
        title="English"
      >
        <img
          src={activeMeta.flag}
          alt={activeMeta.alt}
          className="w-[22px] h-[22px] rounded-[4px] object-cover"
        />
      </div>
    </div>
  );
}
