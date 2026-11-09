import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
	Dict,
	getStoredLang,
	Lang,
	LANGUAGES,
	LANG_STORAGE_KEY,
	translations,
} from "./translations";

interface LanguageContextValue {
	lang: Lang;
	setLang: (lang: Lang) => void;
	t: Dict;
	dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [lang, setLangState] = useState<Lang>(getStoredLang());
	const meta = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

	useEffect(() => {
		document.documentElement.lang = meta.htmlLang;
		document.documentElement.dir = meta.dir;
	}, [meta]);

	const setLang = (next: Lang) => {
		try {
			localStorage.setItem(LANG_STORAGE_KEY, next);
		} catch (e) {}
		setLangState(next);
	};

	return (
		<LanguageContext.Provider value={{ lang, setLang, t: translations[lang], dir: meta.dir }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useTranslation = () => {
	const context = useContext(LanguageContext);
	if (context === undefined) throw new Error("useTranslation within LanguageProvider");
	return context;
};
