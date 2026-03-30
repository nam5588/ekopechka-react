import React, { useEffect } from "react";

import "../../../css/home.css";
import Statistics from "./Statistics";
import Services from "./Services";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProducts";
import Advertisement from "./Advertisement";
import Events from "./Events";

export default function HomePage() {
	return (
		<div className={"homepage"}>
			<Statistics />
			<PopularProducts />
			<NewProducts />
			<Services />
			<Advertisement />
			<Events />
		</div>
	);
}
