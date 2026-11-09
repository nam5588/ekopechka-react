import React from "react";
import { Container } from "@mui/material";
import { useTranslation } from "../../i18n/LanguageContext";

export default function Statistics() {
	const { t } = useTranslation();

	const stats = [
		{ value: "50+", label: t.home.stats.products },
		{ value: "7000", label: t.home.stats.customers },
		{ value: "1540", label: t.home.stats.orders },
		{ value: `500 ${t.home.stats.tons}`, label: t.home.stats.co2 },
	];

	return (
		<div className="static-frame">
			<Container>
				<h2 className="static-title">{t.home.impactTitle}</h2>
				<div className="static-grid">
					{stats.map((item, i) => (
						<div className="static-card" key={i}>
							<span className="static-value">{item.value}</span>
							<span className="static-label">{item.label}</span>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}
