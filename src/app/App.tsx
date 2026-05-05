import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./screens/homePage";
import OrdersPage from "./screens/ordersPage";
import ProductsPage from "./screens/productsPage/index";
import UserPage from "./screens/userPage";
import Navber from "./components/headers/Navbar";
import Footer from "./components/footer";
import HelpPage from "./screens/helpPage";
import ArticlesPage from "./screens/articlesPage";
import MobileBottomNav from "./components/MobileBottomNav";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";

import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";
import { useGlobals } from "./hooks/useGlobals";
import useBasket from "./hooks/useBasket";
import MemberService from "./services/MemberService";
import AuthenticationModal from "./components/auth";

function App() {
	const { setAuthMember } = useGlobals();
	const { cartItems, onAdd, onDelete, onDeleteAll, onRemove } = useBasket();
	const [signupOpen, setSignupOpen] = useState<boolean>(false);
	const [loginOpen, setLoginOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	/**  HANDLERS  **/

	const handleSignupClose = () => setSignupOpen(false);
	const handleLoginClose = () => setLoginOpen(false);

	const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) =>
		setAnchorEl(e.currentTarget);
	const handleLogoutClose = () => setAnchorEl(null);
	const handleLogoutRequest = async () => {
		try {
			const member = new MemberService();
			await member.logout();
			await sweetTopSuccessAlert("Success", 700);
			setAuthMember(null);
		} catch (err) {
			console.log(err);
			sweetErrorHandling(Messages.error1);
		}
	};

	return (
		<>
			<Navber
				onAdd={onAdd}
				cartItems={cartItems}
				onRemove={onRemove}
				onDeleteAll={onDeleteAll}
				onDelete={onDelete}
				setLoginOpen={setLoginOpen}
				anchorEl={anchorEl}
				handleLogoutClick={handleLogoutClick}
				handleLogoutClose={handleLogoutClose}
				handleLogoutRequest={handleLogoutRequest}
			/>
			<div className="main-content">
				<Switch>
					<Route path="/products">
						<ProductsPage onAdd={onAdd} />
					</Route>
					<Route path="/articles">
						<ArticlesPage />
					</Route>
					<Route path="/orders">
						<OrdersPage />
					</Route>
					<Route path="/my-page">
						<UserPage />
					</Route>
					<Route path="/help">
						<HelpPage />
					</Route>
					<Route path="/">
						<HomePage setSignupOpen={setSignupOpen} onAdd={onAdd} />
					</Route>
				</Switch>
				<Footer />
			</div>
			<MobileBottomNav cartItems={cartItems} />
			<AuthenticationModal
				signupOpen={signupOpen}
				loginOpen={loginOpen}
				handleSignupClose={handleSignupClose}
				handleLoginClose={handleLoginClose}
			/>
		</>
	);
}

export default App;
