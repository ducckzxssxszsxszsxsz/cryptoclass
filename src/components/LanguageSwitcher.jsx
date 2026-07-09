import React, { useState, useRef, useEffect } from "react";
import { getLang, setLang } from "../i18n";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", label: "EN" },
  { code: "id", label: "ID" },
];

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [lang, setLangState] = useState(getLang());
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLang = (code) => {
    setLang(code);
    setLangState(code);
    setOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm px-2.5 py-2 rounded-xl text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">{lang.toUpperCase()}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-20 rounded-xl border border-tombol/10 bg-kempat/95 backdrop-blur-xl shadow-2xl z-50 animate-in overflow-hidden">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLang(l.code)}
              className={`w-full text-left px-3 py-2 text-xs transition-all ${
                lang === l.code ? "text-tombol bg-tombol/10" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;