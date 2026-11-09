import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Check, Language } from "@mui/icons-material";
import { useTranslation } from "../../i18n/LanguageContext";
import { LANGUAGES } from "../../i18n/translations";

interface LanguageSwitcherProps {
	fullWidth?: boolean;
}

export default function LanguageSwitcher({ fullWidth }: LanguageSwitcherProps) {
	const { lang, setLang, t } = useTranslation();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

	return (
		<>
			<Button
				aria-label={t.nav.language}
				aria-haspopup="true"
				onClick={(e) => setAnchorEl(e.currentTarget)}
				startIcon={<Language fontSize="small" />}
				fullWidth={fullWidth}
				className="lang-switcher-btn"
				sx={{
					color: "#333",
					textTransform: "none",
					fontWeight: 600,
					minWidth: 0,
					px: 1.2,
					borderRadius: "10px",
					border: "1px solid #e5e5e5",
					background: "transparent !important",
					gap: "4px",
				}}>
				{fullWidth ? current.label : current.short}
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
				disableScrollLock>
				{LANGUAGES.map((l) => (
					<MenuItem
						key={l.code}
						selected={l.code === lang}
						onClick={() => {
							setLang(l.code);
							setAnchorEl(null);
						}}
						sx={{ gap: 1.5, minWidth: 160, direction: l.dir }}>
						<span style={{ flex: 1 }}>{l.label}</span>
						{l.code === lang && <Check fontSize="small" sx={{ color: "#6b8e6f" }} />}
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
