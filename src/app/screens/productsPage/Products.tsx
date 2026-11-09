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
	Star,
	Visibility,
} from "@mui/icons-material";
import { getImageUrl } from "../../../lib/config";
// @ts-ignore
import "../../../css/home.css";
import { ProductStatus, ProductType } from "../../../lib/enums/product.enum";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { useTranslation } from "../../i18n/LanguageContext";

const categories: { key: "all" | "stoves" | "boilers" | "fuels" | "others"; value: ProductType | undefined }[] = [
	{ key: "all", value: undefined },
	{ key: "stoves", value: ProductType.STOVE },
	{ key: "boilers", value: ProductType.BOILER },
	{ key: "fuels", value: ProductType.FUEL },
	{ key: "others", value: ProductType.OTHER },
];

const orderOptions: { key: "all" | "price" | "view" | "like" | "new"; value: string }[] = [
	{ key: "all", value: "createdAt" },
	{ key: "price", value: "productPrice" },
	{ key: "view", value: "productViews" },
	{ key: "like", value: "productLikes" },
	{ key: "new", value: "createdAt" },
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
	const { t } = useTranslation();

	const [searchText, setSearchText] = useState<string>("");
	const [activeCategory, setActiveCategory] = useState<string>("all");
	const [activeOrder, setActiveOrder] = useState<string>("all");

	useEffect(() => {
		const product = new ProductService();
		product
			.getProducts(productSearch)
			.then((data) => setProducts(data))
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
							<h3 className="sidebar-title">{t.products.filters}</h3>

							{/* Search */}
							<div className="sidebar-section">
								<p className="sidebar-label">{t.products.search}</p>
								<input
									className="sidebar-search"
									type="text"
									placeholder={t.products.searchPlaceholder}
									value={searchText}
									onChange={(e) => setSearchText(e.target.value)}
								/>
							</div>

							{/* Category */}
							<div className="sidebar-section">
								<p className="sidebar-label">{t.products.category}</p>
								<ul className="sidebar-categories">
									{categories.map((cat) => (
										<li
											key={cat.key}
											className={`sidebar-cat-item ${activeCategory === cat.key ? "active" : ""}`}
											onClick={() => categoryHandler(cat.key, cat.value)}>
											{t.products.categories[cat.key]}
										</li>
									))}
								</ul>
							</div>

							{/* Order */}
							<div className="sidebar-section">
								<p className="sidebar-label">{t.products.order}</p>
								<ul className="sidebar-categories">
									{orderOptions.map((opt) => (
										<li
											key={opt.key}
											className={`sidebar-cat-item ${activeOrder === opt.key ? "active" : ""}`}
											onClick={() => orderHandler(opt.key, opt.value)}>
											{t.products.orderOptions[opt.key]}
										</li>
									))}
								</ul>
							</div>
						</aside>

						{/* Products */}
						<div className="products-main">
							<div className="products-box">
								{products.length === 0 ? (
									<Box className="no-products">{t.products.notAvailable}</Box>
								) : (
									<div className="popular-grid">
										{products.map((product) => {
											const imagePath = getImageUrl(product.productImages[0]);
											return (
												<div
													onClick={() => chooseDishHandler(product._id)}
													key={product._id}
													className="product-card">
													<div className={`product-img-wrap`}>
														{product.productStatus ===
															ProductStatus.SOLDOUT && (
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
																<Star className="star-icon" />
																<Star className="star-icon" />
															</span>
														</div>
														<div className="product-meta">
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
