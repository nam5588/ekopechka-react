import React from "react";
import { Container, Button } from "@mui/material";
import {
	Favorite,
	FavoriteBorder,
	Star,
	Visibility,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { retrieveNewProducts } from "./selector";

/** REDUX SLICE & SELECTOR **/
const popularProductRetriever = createSelector(
	retrieveNewProducts,
	(newProducts) => ({ newProducts }),
);

export default function NewProducts() {
	const { newProducts } = useSelector(popularProductRetriever);
	const favLike: boolean = true;
	return (
		<div className={"new-products-frame"}>
			<Container>
				{/* Header */}
				<div className="popular-header">
					<h2 className="popular-title">New Arrivals </h2>
					<NavLink to={"/products"} className="popular-view-all">
						View All →
					</NavLink>
				</div>

				<div className="popular-grid">
					{newProducts.map((product) => {
						const imagePath = `${serverApi}/${product.productImages[0]}`;
						return (
							<div key={product._id} className="product-card">
								<div className="product-img-wrap">
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
									<Button className="product-add-btn" fullWidth>
										Add to Cart
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			</Container>
		</div>
	);
}
