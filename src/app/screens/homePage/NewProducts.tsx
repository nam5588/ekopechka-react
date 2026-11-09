import React from "react";
import { Container, Button } from "@mui/material";
import {
	Star,
	Visibility,
} from "@mui/icons-material";
import { NavLink, useHistory } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getImageUrl } from "../../../lib/config";
import { retrieveNewProducts } from "./selector";
import { CartItem } from "../../../lib/types/search";
import { ProductStatus } from "../../../lib/enums/product.enum";
import { useTranslation } from "../../i18n/LanguageContext";

/** REDUX SLICE & SELECTOR **/
const popularProductRetriever = createSelector(
	retrieveNewProducts,
	(newProducts) => ({ newProducts }),
);

interface NewProductsProps {
	onAdd: (item: CartItem) => void;
}

export default function NewProducts(props: NewProductsProps) {
	const { onAdd } = props;
	const history = useHistory();
	const { t } = useTranslation();

	const { newProducts } = useSelector(popularProductRetriever);

	const chooseDishHandler = (id: string) => {
		history.push(`/products/${id}`);
	};

	return (
		<div className={"new-products-frame"}>
			<Container>
				{/* Header */}
				<div className="popular-header">
					<h2 className="popular-title">{t.home.newTitle}</h2>
					<NavLink to={"/products"} className="popular-view-all">
						{t.common.viewAll}
					</NavLink>
				</div>

				<div className="popular-grid">
					{newProducts.map((product) => {
						const imagePath = getImageUrl(product.productImages[0]);
						return (
							<div
								onClick={() => chooseDishHandler(product._id)}
								key={product._id}
								className="product-card">
								<div className="product-img-wrap">
									{product.productStatus === ProductStatus.SOLDOUT && (
										<div className="sold-out">
											<span>{t.common.soldOut}</span>
										</div>
									)}
									<img
										src={imagePath}
										alt={product.productName}
										className="product-img"
									/>
									<div
										className={`product-count-badge ${product.productLeftCount <= 10 ? "low" : "enough"}`}>
										{t.common.available}: {product.productLeftCount}
									</div>
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
											<Star className="star-icon" />
											<Star className="star-icon" />
										</span>
									</div>
									<div className="product-meta">
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
											{t.common.addToCart}
										</Button>
									) : (
										<Button
											onClick={(e) => {
												e.stopPropagation();
											}}
											className="product-add-btn"
											fullWidth>
											{t.common.soon}
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
