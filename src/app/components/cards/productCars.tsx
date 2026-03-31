import React from "react";
import { Button } from "@mui/material";
import { FavoriteBorder, Star, Visibility } from "@mui/icons-material";

interface ProductCardProps {
	id: number;
	name: string;
	desc: string;
	price: number;
	rating: number;
	likes: number;
	views: number;
	img: string;
}

export default function ProductCard({
	name,
	desc,
	price,
	rating,
	likes,
	views,
	img,
}: ProductCardProps) {
	return (
		<div className="product-card">
			<div className="product-img-wrap">
				<img src={img} alt={name} className="product-img" />
				<button className="product-wish-btn">
					<FavoriteBorder className="product-wish-icon" />
				</button>
			</div>
			<div className="product-body">
				<h3 className="product-name">{name}</h3>
				<p className="product-desc">{desc}</p>
				<div className="product-price-row">
					<span className="product-price">${price}</span>
					<span className="product-rating">
						<Star className="star-icon" />
						{rating}
					</span>
				</div>
				<div className="product-meta">
					<span className="product-meta-item">
						<FavoriteBorder fontSize="small" /> {likes}
					</span>
					<span className="product-meta-item">
						<Visibility fontSize="small" /> {views}
					</span>
				</div>
				<Button className="product-add-btn" fullWidth>
					Add to Cart
				</Button>
			</div>
		</div>
	);
}
