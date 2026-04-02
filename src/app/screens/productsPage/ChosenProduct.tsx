import React, { useEffect } from "react";
import { Button } from "@mui/material";
import {
	FavoriteBorder,
	Visibility,
	ArrowBack,
	CheckCircleOutline,
} from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setNewProductsSug } from "./slice";
import { Product } from "../../../lib/types/products";
import { useDispatch, useSelector } from "react-redux";

import { serverApi } from "../../../lib/config";
import ProductService from "../../services/ProductService";
import { retrieveNewProductsSug, retrieveChosenProduct } from "./selector";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
	setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
	setNewProductsSug: (data: Product[]) => dispatch(setNewProductsSug(data)),
});

const chosenProductRetriever = createSelector(
	retrieveChosenProduct,
	(product) => ({
		product,
	}),
);

const newProductsSugRetriever = createSelector(
	retrieveNewProductsSug,
	(newProductsSug) => ({
		newProductsSug,
	}),
);

interface ChosenProductProps {
	onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
	const { onAdd } = props;
	const { setChosenProduct, setNewProductsSug } = actionDispatch(useDispatch());
	const { product } = useSelector(chosenProductRetriever);
	const { newProductsSug } = useSelector(newProductsSugRetriever);
	const { productId } = useParams<{ productId: string }>();
	const history = useHistory();
	useEffect(() => {
		const product = new ProductService();
		product
			.getProduct(productId)
			.then((data) => setChosenProduct(data))
			.catch((err) => console.log(err));
		product
			.getProducts({ page: 1, limit: 3, order: "productViews" })
			.then((data) => {
				setNewProductsSug(data);
			})
			.catch((err) => console.log(err));
	}, [productId]);

	const chooseDishHandler = (id: string) => {
		history.push(`/products/${id}`);
	};
	if (!product) return null;
	return (
		<div className="chosen-page">
			<div className="chosen-card">
				{/* Back */}
				<button
					className="chosen-back"
					onClick={() => history.push("/products")}>
					<ArrowBack fontSize="small" /> Back to Products
				</button>

				{/* Main */}
				<div className="chosen-main">
					<div className="chosen-img-wrap">
						<img
							src={`${serverApi}/${product?.productImages[0]}`}
							alt={""}
							className="chosen-img"
						/>
					</div>

					<div className="chosen-info">
						<h1 className="chosen-name">{product?.productName}</h1>
						<p className="chosen-desc">{product?.productDesc}</p>

						<div className="chosen-price-row">
							<span className="chosen-price">${product?.productPrice}</span>
						</div>

						<div className="chosen-stock">
							<CheckCircleOutline fontSize="small" />
							In Stock
						</div>

						<div className="chosen-divider" />

						<div className="chosen-meta">
							<span className="chosen-meta-item">
								<FavoriteBorder fontSize="small" />
								{product?.productLikes} likes
							</span>
							<span className="chosen-meta-item">
								<Visibility fontSize="small" />
								{product?.productViews} views
							</span>
						</div>

						<Button
							className="chosen-btn-cart"
							fullWidth
							onClick={(e) => {
								onAdd({
									_id: product._id,
									quantity: 1,
									name: product.productName,
									price: product.productPrice,
									image: product.productImages[0],
								});
								e.stopPropagation();
							}}>
							Add to Cart
						</Button>
					</div>
				</div>

				{/* Related */}
				<div className="chosen-divider" />

				<div className="chosen-related">
					<h2 className="chosen-related-title">
						You might also like our popular products
					</h2>
					<div className="chosen-related-grid">
						{newProductsSug.map((product) => (
							<div
								className="related-card"
								key={product._id}
								onClick={() => chooseDishHandler(product._id)}>
								<div className="related-img-wrap">
									<img
										src={`${serverApi}/${product?.productImages?.[0]}`}
										alt={""}
										className="related-img"
									/>
								</div>
								<div className="related-body">
									<h4 className="related-name">{product.productName}</h4>
									<div className="related-bottom">
										<span className="related-price">
											${product.productPrice}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
