import React from "react";
import { Container } from "@mui/material";
import { useTranslation } from "../../i18n/LanguageContext";

const icons = ["🚚", "✔️", "🌱", "💬"];

export default function Services() {
	const { t } = useTranslation();

	return (
		<div className="service-frame">
			<Container>
				<h2 className="service-title">{t.home.servicesTitle}</h2>
				<div className="service-grid">
					{t.home.services.map((item, i) => (
						<div className="service-card" key={i}>
							<span className="service-icon">{icons[i]}</span>
							<h3 className="service-name">{item.title}</h3>
							<p className="service-desc">{item.desc}</p>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}
