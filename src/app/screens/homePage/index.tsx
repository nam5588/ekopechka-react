import React, { useEffect } from "react";
import ProductService from "../../services/ProductService";
import { Box, Button, Container, Stack } from "@mui/material";

import "../../../css/home.css";
import Statistics from "./Statistics";
import Services from "./Services";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProducts";
import Events from "./Events";
import { NavLink } from "react-router-dom";
import { ProductType } from "../../../lib/enums/product.enum";
import { Product } from "../../../lib/types/products";
import { Article } from "../../../lib/types/article";
import {
	setNewProducts,
	setPopularArticles,
	setPopularProducts,
} from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import ArticleService from "../../services/ArticleService";
import { useGlobals } from "../../hooks/useGlobals";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
	setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
	setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
	setPopularArticles: (data: Article[]) => dispatch(setPopularArticles(data)),
});

interface HomePageProps {
	setSignupOpen: (isOpen: boolean) => void;
	onAdd: (item: CartItem) => void;
}

export default function HomePage(props: HomePageProps) {
	const { setSignupOpen, onAdd } = props;
	const { authMember } = useGlobals();

	const { setPopularProducts, setNewProducts, setPopularArticles } =
		actionDispatch(useDispatch());

	useEffect(() => {
		const product = new ProductService();
		product
			.getProducts({
				page: 1,
				limit: 4,
				order: "productViews",
				productType: ProductType.STOVE,
			})
			.then((data) => {
				setPopularProducts(data);
			})
			.catch((err) => console.log(err));

		product
			.getProducts({
				page: 1,
				limit: 4,
				order: "createdAt",
				productType: ProductType.STOVE,
			})
			.then((data) => {
				setNewProducts(data);
			})
			.catch((err) => console.log(err));

		const article = new ArticleService();
		article
			.getArticles({
				page: 1,
				limit: 3,
				order: "articleViews",
			})
			.then((data) => {
				setPopularArticles(data);
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<div className="home-welcome">
				<Container>
					<Stack
						className="welcome-inner"
						flexDirection={"row"}
						alignItems={"center"}>
						<Stack className="welcome-txt" flexDirection={"column"}>
							<h1 className="welcome-title">
								Welcome to <br /> EkoPechka
							</h1>
							<p className="welcome-desc">
								Discover sustainable, eco-friendly products that make a real
								difference. From organic clothing to renewable energy solutions,
								we're committed to helping you live a more sustainable
								lifestyle.
							</p>
							<Stack
								flexDirection={"row"}
								gap={"16px"}
								className="welcome-btns">
								{!authMember ? (
									<NavLink to={"/signup"}>
										<Button
											className="btn-shop"
											onClick={() => setSignupOpen(true)}>
											SignUp
										</Button>
									</NavLink>
								) : (
									<>
										<NavLink to={"/products"}>
											<Button className="btn-shop">Shop Now</Button>
										</NavLink>
										<NavLink to={"/help"}>
											<Button className="btn-learn">Learn More</Button>
										</NavLink>
									</>
								)}
							</Stack>
						</Stack>

						<Box className="welcome-img-box">
							<video
								className="welcome-img"
								autoPlay={true}
								loop
								muted
								playsInline
								data-video-media="">
								<source type="video/mp4" src="/video/ads-ekopechka.mp4" />
							</video>
						</Box>
					</Stack>
				</Container>
			</div>
			<Statistics />
			<PopularProducts onAdd={onAdd} />
			<Services />
			<NewProducts onAdd={onAdd} />
			<Events />
		</div>
	);
}
