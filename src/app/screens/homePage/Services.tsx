import React from "react";
import { Container } from "@mui/material";

const services = [
	{
		icon: "🚚",
		title: "Fast Shipping",
		desc: "Eco-friendly packaging with fast delivery",
	},
	{
		icon: "✔️",
		title: "Quality Guarantee",
		desc: "Premium products with lifetime support",
	},
	{
		icon: "🌱",
		title: "Sustainable",
		desc: "All products are environmentally friendly",
	},
	{
		icon: "💬",
		title: "24/7 Support",
		desc: "Round-the-clock customer service",
	},
];

export default function Services() {
	return (
		<div className="service-frame">
			<Container>
				<h2 className="service-title">Our Services</h2>
				<div className="service-grid">
					{services.map((item, i) => (
						<div className="service-card" key={i}>
							<span className="service-icon">{item.icon}</span>
							<h3 className="service-name">{item.title}</h3>
							<p className="service-desc">{item.desc}</p>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}
