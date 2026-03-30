import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenArticle from "./ChosenArticle";
import Article from "./Article";
import "../../../css/products.css";

export default function ArticlesPage() {
	const products = useRouteMatch();

	return (
		<div className="products-page">
			<Switch>
				<Route path={`${products.path}/:productId`}>
					<ChosenArticle />
				</Route>
				<Route path={`${products.path}`}>
					<Article />
				</Route>
			</Switch>
		</div>
	);
}
