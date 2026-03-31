import React from "react";
import { Container, Button } from "@mui/material";
import {
	Favorite,
	FavoriteBorder,
	Star,
	Visibility,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import ProductCard from "../../components/cards/productCars";

const products = [
	{
		id: 1,
		name: "Organic Cotton T-Shirt",
		desc: "Comfortable and sustainable cotton t-shirt",
		price: 29.99,
		rating: 4.8,
		likes: 234,
		views: 1205,
		img: "/img/product1.jpg",
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
	},
];

export default function PopularProducts() {
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

				{/* Grid */}
				<div className="popular-grid">
					{products.map((product) => (
						<ProductCard key={product.id} {...product} />
					))}
				</div>
			</Container>
		</div>
	);
}
