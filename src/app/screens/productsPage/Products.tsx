import React, { useState } from "react";
import { Container, Pagination, PaginationItem, Stack } from "@mui/material";
import ProductCard from "../../components/cards/productCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const categories = ["All", "Stoves", "Boilers", "Fuels", "Others"];
const order = ["All", "Price", "View", "Like", "New"];

const allProducts = [
	{
		id: 1,
		name: "Organic Cotton T-Shirt",
		desc: "Comfortable and sustainable cotton t-shirt",
		price: 29.99,
		rating: 4.8,
		likes: 234,
		views: 1205,
		img: "/img/product1.jpg",
		category: "Clothing",
	},
	{
		id: 2,
		name: "Bamboo Water Bottle",
		desc: "Eco-friendly water bottle made from sustainable bamboo",
		price: 24.99,
		rating: 4.9,
		likes: 456,
		views: 2341,
		img: "/img/product2.jpg",
		category: "Accessories",
	},
	{
		id: 3,
		name: "Recycled Plastic Bag",
		desc: "Durable bag made from 100% recycled plastic",
		price: 34.99,
		rating: 4.6,
		likes: 189,
		views: 876,
		img: "/img/product3.jpg",
		category: "Bags",
	},
	{
		id: 4,
		name: "Natural Soap Set",
		desc: "Hand-made soap from natural ingredients",
		price: 19.99,
		rating: 4.7,
		likes: 312,
		views: 1543,
		img: "/img/product4.jpg",
		category: "Beauty",
	},
	{
		id: 5,
		name: "Eco-Friendly Notebook",
		desc: "Notebook made from recycled paper",
		price: 14.99,
		rating: 4.5,
		likes: 145,
		views: 654,
		img: "/img/product5.jpg",
		category: "Stationery",
	},
	{
		id: 6,
		name: "Solar Power Bank",
		desc: "Portable solar-powered charging device",
		price: 49.99,
		rating: 4.8,
		likes: 567,
		views: 3421,
		img: "/img/product6.jpg",
		category: "Electronics",
	},
];

export default function Products() {
	const [search, setSearch] = useState("");
	const [activeCategory, setActiveCategory] = useState("All");

	const filtered = allProducts.filter((p) => {
		const matchCategory =
			activeCategory === "All" || p.category === activeCategory;
		const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
		return matchCategory && matchSearch;
	});

	return (
		<div className="products-page">
			{/* Content */}
			<div className="products-content">
				<Container>
					<div className="products-layout">
						{/* Sidebar */}
						<aside className="products-sidebar">
							<h3 className="sidebar-title">Filters</h3>

							<div className="sidebar-section">
								<p className="sidebar-label">Search</p>
								<input
									className="sidebar-search"
									type="text"
									placeholder="Search products..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>

							<div className="sidebar-section">
								<p className="sidebar-label">Category</p>
								<ul className="sidebar-categories">
									{categories.map((cat) => (
										<li
											key={cat}
											className={`sidebar-cat-item ${activeCategory === cat ? "active" : ""}`}
											onClick={() => setActiveCategory(cat)}>
											{cat}
										</li>
									))}
								</ul>
							</div>
							<div className="sidebar-section">
								<p className="sidebar-label">Order</p>
								<ul className="sidebar-categories">
									{order.map((cat) => (
										<li
											key={cat}
											className={`sidebar-cat-item ${activeCategory === cat ? "active" : ""}`}
											onClick={() => setActiveCategory(cat)}>
											{cat}
										</li>
									))}
								</ul>
							</div>
						</aside>

						{/* Products */}
						<div className="products-main">
							<h2 className="products-count">
								Available Products ({filtered.length})
							</h2>
							<div className="products-grid">
								{/* {filtered.map((product) => (
									// <ProductCard key={product.id} {...product} />
								))} */}
								<Stack className="pagination-section">
									<Pagination
										count={allProducts.length !== 0 ? 4 : 8}
										page={1}
										renderItem={(item) => (
											<PaginationItem
												components={{
													previous: ArrowBackIcon,
													next: ArrowForwardIcon,
												}}
												{...item}
												// color="primary"
											/>
										)}
									/>
								</Stack>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
}
