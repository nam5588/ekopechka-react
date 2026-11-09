import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../../css/products.css";
import { Container } from "@mui/material";
import { CartItem } from "../../../lib/types/search";
import { useTranslation } from "../../i18n/LanguageContext";

interface ProductPageProps {
	onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductPageProps) {
	const { onAdd } = props;
	const products = useRouteMatch();
	const { t } = useTranslation();

	return (
		<div className="products-page">
			{/* Hero */}
			<div className="products-hero">
				<Container>
					<h1 className="products-hero-title">{t.products.heroTitle}</h1>
					<p className="products-hero-desc">{t.products.heroDesc}</p>
				</Container>
			</div>
			<Switch>
				<Route path={`${products.path}/:productId`}>
					<ChosenProduct onAdd={onAdd} />
				</Route>
				<Route path={`${products.path}`}>
					<Products onAdd={onAdd} />
				</Route>
			</Switch>
		</div>
	);
}
