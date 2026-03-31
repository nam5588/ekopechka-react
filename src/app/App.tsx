import React, { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import OrdersPage from "./screens/ordersPage";
import ProductsPage from "./screens/productsPage/index";
import UserPage from "./screens/userPage";
import Navber from "./components/headers/Navbar";
import Footer from "./components/footer";
import HelpPage from "./screens/helpPage";
import ArticlesPage from "./screens/articlesPage";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";

import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";

function App() {
	return (
		<>
			<Navber />
			<Switch>
				<Route path="/products">
					<ProductsPage />
				</Route>
				<Route path="/articles">
					<ArticlesPage />
				</Route>
				<Route path="/orders">
					<OrdersPage />
				</Route>
				<Route path="/member-page">
					<UserPage />
				</Route>
				<Route path="/help">
					<HelpPage />
				</Route>
				<Route path="/">
					<HomePage />
				</Route>
			</Switch>
			<Footer />
		</>
	);
}

export default App;
