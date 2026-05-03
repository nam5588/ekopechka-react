import React, { ChangeEvent, useEffect, useState } from "react";
import {
	Box,
	Button,
	Container,
	Pagination,
	PaginationItem,
	Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Product, ProductInquiry } from "../../../lib/types/products";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { retrieveProducts } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { setProducts } from "./slice";
import {
	Favorite,
	FavoriteBorder,
	Star,
	Visibility,
} from "@mui/icons-material";
import { serverApi } from "../../../lib/config";
// @ts-ignore
import "../../../css/home.css";
import { ProductStatus, ProductType } from "../../../lib/enums/product.enum";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

const categories = [
	{ label: "All", value: undefined },
	{ label: "Stoves", value: ProductType.STOVE },
	{ label: "Boilers", value: ProductType.BOILER },
	{ label: "Fuels", value: ProductType.FUEL },
	{ label: "Others", value: ProductType.OTHER },
];

const orderOptions = [
	{ label: "All", value: "createdAt" },
	{ label: "Price", value: "productPrice" },
	{ label: "View", value: "productViews" },
	{ label: "Like", value: "productLikes" },
	{ label: "New", value: "createdAt" },
];

const actionDispatch = (dispatch: Dispatch) => ({
	setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
	products,
}));

interface ProductsProps {
	onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
	const { onAdd } = props;
	const favLike: boolean = true;
	const { setProducts } = actionDispatch(useDispatch());
	const { products } = useSelector(productsRetriever);

	const [productSearch, setProductSearch] = useState<ProductInquiry>({
		page: 1,
		limit: 8,
		order: "createdAt",
		search: "",
		productType: undefined,
	});
	const history = useHistory();

	const [searchText, setSearchText] = useState<string>("");
	const [activeCategory, setActiveCategory] = useState<string>("All");
	const [activeOrder, setActiveOrder] = useState<string>("All");

	useEffect(() => {
		const product = new ProductService();
		product
			.getProducts(productSearch)
			.then((data) => setProducts(data))
			.catch((err) => console.log(err));
	}, [productSearch]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setProductSearch((prev) => ({ ...prev, page: 1, search: searchText }));
		}, 500);
		return () => clearTimeout(timer);
	}, [searchText]);

	/** HANDLERS **/
	const categoryHandler = (label: string, value: ProductType | undefined) => {
		setActiveCategory(label);
		setProductSearch((prev) => ({ ...prev, page: 1, productType: value }));
	};

	const orderHandler = (label: string, value: string) => {
		setActiveOrder(label);
		setProductSearch((prev) => ({ ...prev, page: 1, order: value }));
	};

	const paginationHandler = (_e: ChangeEvent<any>, value: number) => {
		setProductSearch((prev) => ({ ...prev, page: value }));
	};

	const chooseDishHandler = (id: string) => {
		history.push(`/products/${id}`);
	};

	return (
		<div className="products-page">
			<div className="products-content">
				<Container>
					<div className="products-layout">
						{/* Sidebar */}
						<aside className="products-sidebar">
							<h3 className="sidebar-title">Filters</h3>

							{/* Search */}
							<div className="sidebar-section">
								<p className="sidebar-label">SEARCH</p>
								<input
									className="sidebar-search"
									type="text"
									placeholder="Search products..."
									value={searchText}
									onChange={(e) => setSearchText(e.target.value)}
								/>
							</div>

							{/* Category */}
							<div className="sidebar-section">
								<p className="sidebar-label">CATEGORY</p>
								<ul className="sidebar-categories">
									{categories.map((cat) => (
										<li
											key={cat.label}
											className={`sidebar-cat-item ${activeCategory === cat.label ? "active" : ""}`}
											onClick={() => categoryHandler(cat.label, cat.value)}>
											{cat.label}
										</li>
									))}
								</ul>
							</div>

							{/* Order */}
							<div className="sidebar-section">
								<p className="sidebar-label">ORDER</p>
								<ul className="sidebar-categories">
									{orderOptions.map((opt) => (
										<li
											key={opt.label}
											className={`sidebar-cat-item ${activeOrder === opt.label ? "active" : ""}`}
											onClick={() => orderHandler(opt.label, opt.value)}>
											{opt.label}
										</li>
									))}
								</ul>
							</div>
						</aside>

						{/* Products */}
						<div className="products-main">
							<div className="products-box">
								{products.length === 0 ? (
									<Box className="no-products">Products are not available!</Box>
								) : (
									<div className="popular-grid">
										{products.map((product) => {
											const imagePath = `${serverApi}/${product.productImages[0]}`;
											return (
												<div
													onClick={() => chooseDishHandler(product._id)}
													key={product._id}
													className="product-card">
													<div className={`product-img-wrap`}>
														{product.productStatus ===
															ProductStatus.SOLDOUT && (
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
														<h3 className="product-name">
															{product.productName}
														</h3>
														<p className="product-desc">
															{product.productDesc.slice(0, 25) + "..."}
														</p>
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
																<FavoriteBorder fontSize="small" />{" "}
																{product.productLikes}
															</span>
															<span className="product-meta-item">
																<Visibility fontSize="small" />{" "}
																{product.productViews}
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
								)}
							</div>

							{/* Pagination */}
							<Stack sx={{ marginTop: "20px" }} className="pagination-section">
								<Pagination
									count={
										products.length !== 0
											? productSearch.page + 1
											: productSearch.page
									}
									page={productSearch.page}
									renderItem={(item) => (
										<PaginationItem
											components={{
												previous: ArrowBackIcon,
												next: ArrowForwardIcon,
											}}
											{...item}
										/>
									)}
									onChange={paginationHandler}
								/>
							</Stack>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
}
