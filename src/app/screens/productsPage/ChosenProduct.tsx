import React from "react";
import { Button } from "@mui/material";
import {
	FavoriteBorder,
	Visibility,
	Star,
	ArrowBack,
	CheckCircleOutline,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";

const product = {
	id: 1,
	name: "Organic Cotton T-Shirt",
	desc: "Comfortable and sustainable cotton t-shirt",
	price: 29.99,
	rating: 4.8,
	likes: 234,
	views: 1205,
	img: "/img/product1.jpg",
	category: "Clothing",
};

export default function ChosenProduct() {
	const history = useHistory();
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
						<img src={product.img} alt={product.name} className="chosen-img" />
					</div>

					<div className="chosen-info">
						<h1 className="chosen-name">{product.name}</h1>

						<div className="chosen-rating-row">
							<div className="chosen-stars">{product.rating}</div>
							<span className="chosen-rating-txt">{product.rating} rating</span>
						</div>

						<p className="chosen-desc">{product.desc}</p>

						<div className="chosen-price-row">
							<span className="chosen-price">${product.price}</span>
						</div>

						<div className="chosen-stock">
							<CheckCircleOutline fontSize="small" />
							In Stock
						</div>

						<div className="chosen-divider" />

						<div className="chosen-meta">
							<span className="chosen-meta-item">
								<FavoriteBorder fontSize="small" />
								{product.likes} likes
							</span>
							<span className="chosen-meta-item">
								<Visibility fontSize="small" />
								{product.views} views
							</span>
						</div>

						<Button className="chosen-btn-cart" fullWidth>
							Add to Cart
						</Button>
						<Button className="chosen-btn-wish" fullWidth>
							Add to Wishlist
						</Button>
					</div>
				</div>

				{/* Related */}
				<div className="chosen-divider" />

				<div className="chosen-related">
					<h2 className="chosen-related-title">You Might Also Like</h2>
					<div className="chosen-related-grid">
						{[
							{ id: 1, img: "", name: "test", price: 10, rating: 1 },
							{ id: 1, img: "", name: "test", price: 10, rating: 2 },
							{ id: 1, img: "", name: "test", price: 10, rating: 3 },
						].map((item) => (
							<div
								className="related-card"
								key={item.id}
								onClick={() => history.push(`/products/${item.id}`)}>
								<div className="related-img-wrap">
									<img src={item.img} alt={item.name} className="related-img" />
								</div>
								<div className="related-body">
									<h4 className="related-name">{item.name}</h4>
									<div className="related-bottom">
										<span className="related-price">${item.price}</span>
										<span className="related-rating">
											{item.rating} <Star className="related-star" />
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
