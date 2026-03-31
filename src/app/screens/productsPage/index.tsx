import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../../css/products.css";
import { Container } from "@mui/material";

export default function ProductsPage() {
	const products = useRouteMatch();

	return (
		<div className="products-page">
			{/* Hero */}
			<div className="products-hero">
				<Container>
					<h1 className="products-hero-title">Our Products</h1>
					<p className="products-hero-desc">
						Discover our collection of sustainable, eco-friendly products
					</p>
				</Container>
			</div>
			<Switch>
				<Route path={`${products.path}/:productId`}>
					<ChosenProduct />
				</Route>
				<Route path={`${products.path}`}>
					<Products />
				</Route>
			</Switch>
		</div>
	);
}
