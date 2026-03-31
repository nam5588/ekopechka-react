import React from "react";
import { Container } from "@mui/material";

const stats = [
	{ value: "50+", label: "Products" },
	{ value: "7000", label: "Customers" },
	{ value: "1540", label: "Orders" },
	{
		value: "500 tons",
		label: (
			<>
				CO<sub>2</sub> Saved
			</>
		),
	},
];

export default function Statistics() {
	return (
		<div className="static-frame">
			<Container>
				<h2 className="static-title">Our Impact</h2>
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
