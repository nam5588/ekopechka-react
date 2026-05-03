import React from "react";
import { Button, Container } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";

import { createSelector } from "@reduxjs/toolkit";
import { retrievePopularProducts } from "./selector";
import { useSelector } from "react-redux";
import {
	Favorite,
	FavoriteBorder,
	Star,
	Visibility,
} from "@mui/icons-material";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { ProductStatus } from "../../../lib/enums/product.enum";

/** REDUX SLICE & SELECTOR **/
const popularProductRetriever = createSelector(
	retrievePopularProducts,
	(popularProducts) => ({ popularProducts }),
);

interface PopularProductsProps {
	onAdd: (item: CartItem) => void;
}

export default function PopularProducts(props: PopularProductsProps) {
	const { onAdd } = props;
	const history = useHistory();

	const { popularProducts } = useSelector(popularProductRetriever);
	const favLike: boolean = true;

	const chooseDishHandler = (id: string) => {
		history.push(`/products/${id}`);
	};

	return (
		<div className="popular-frame">
			<Container>
				{/* Header */}
				<div className="popular-header">
					<h2 className="popular-title">Popular Products</h2>
					<NavLink to={"/products"} className="popular-view-all">
						View All →
					</NavLink>
				</div>
				<div className="popular-grid">
					{popularProducts.map((product) => {
						const imagePath = `${serverApi}/${product.productImages[0]}`;
						return (
							<div
								onClick={() => chooseDishHandler(product._id)}
								key={product._id}
								className="product-card">
								<div className={`product-img-wrap`}>
									{product.productStatus === ProductStatus.SOLDOUT && (
										<div className="sold-out">
											<span>Sold Out</span>
										</div>
									)}
									<img
										src={imagePath}
										alt={product.productName}
										className="product-img"
									/>
									<button className="product-wish-btn">
										{favLike ? (
											<Favorite className="product-wish-icon" />
										) : (
											<FavoriteBorder className="product-wish-icon" />
										)}
									</button>
								</div>
								<div className="product-body">
									<h3 className="product-name">{product.productName}</h3>
									<p className="product-desc">{product.productDesc}</p>
									<div className="product-price-row">
										<span className="product-price">
											${product.productPrice}
										</span>
										<span className="product-rating">
											<Star className="star-icon" />
										</span>
									</div>
									<div className="product-meta">
										<span className="product-meta-item">
											<FavoriteBorder fontSize="small" /> {product.productLikes}
										</span>
										<span className="product-meta-item">
											<Visibility fontSize="small" /> {product.productViews}
										</span>
									</div>
									{product.productStatus !== ProductStatus.SOLDOUT ? (
										<Button
											onClick={(e) => {
												console.log("BUTTON PRESSED");
												onAdd({
													_id: product._id,
													quantity: 1,
													name: product.productName,
													price: product.productPrice,
													image: product.productImages[0],
												});
												e.stopPropagation();
											}}
											className="product-add-btn"
											fullWidth>
											Add to Cart
										</Button>
									) : (
										<Button
											onClick={(e) => {
												e.stopPropagation();
											}}
											className="product-add-btn"
											fullWidth>
											Soon
										</Button>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</Container>
		</div>
	);
}
