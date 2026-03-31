import React, { useState } from "react";
import { Button } from "@mui/material";
import {
	ArrowBack,
	CalendarToday,
	Favorite,
	FavoriteBorder,
	LocationOn,
	Visibility,
} from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";
import "../../../css/articles.css";

const article = {
	id: 1,
	title: "Natural Soap Set",
	desc: "Hand-made soap from natural ingredients",
	likes: 312,
	views: 1543,
	date: "2026.06.02",
	img: "/img/product4.jpg",
	category: "Beauty",
};

export default function ChosenArticle() {
	const { articleId } = useParams<{ articleId: string }>();
	const history = useHistory();
	const [liked, setLiked] = React.useState(false);

	return (
		<div className="chosen-article-page">
			<div className="chosen-article-card">
				{/* Back */}
				<button
					className="chosen-article-back"
					onClick={() => history.push("/articles")}>
					<ArrowBack fontSize="small" /> Back to Articles
				</button>

				{/* Hero Image */}
				<div className="chosen-article-img-wrap">
					<img
						src={article.img}
						alt={article.title}
						className="chosen-article-img"
					/>
				</div>

				{/* Category + Title + Meta */}
				<div className="chosen-article-header">
					<span className="chosen-article-category">{article.category}</span>
					<h1 className="chosen-article-title">{article.title}</h1>
					<div className="chosen-article-meta">
						<span className="chosen-article-meta-item">
							<CalendarToday fontSize="small" /> {article.date}
						</span>
						<span className="chosen-article-meta-item">
							<FavoriteBorder fontSize="small" />
							{article.likes + (liked ? 1 : 0)} likes
						</span>
						<span className="chosen-article-meta-item">
							<Visibility fontSize="small" /> {article.views} views
						</span>
					</div>
				</div>

				<div className="chosen-article-divider" />

				{/* Content */}
				<div className="chosen-article-content">{article.desc}</div>

				{/* Location & Contact */}
				<div className="chosen-article-location-box">
					<div className="chosen-article-location-title">
						<LocationOn fontSize="small" />
						<strong>Location & Contact</strong>
					</div>
					<div className="chosen-article-location-grid">
						<div>
							<h3 className="chosen-article-location-heading">
								EkoPechka Headquarters
							</h3>
							<p>123 Eco Street</p>
							<p>San Francisco, CA 94102</p>
							<p>United States</p>
						</div>
						<div>
							<h3 className="chosen-article-location-heading">
								Contact Information
							</h3>
							<p>Email: info@ekopechka.com</p>
							<p>Phone: +1 (555) 123-4567</p>
							<p>Hours: Mon-Fri 9AM-6PM PT</p>
						</div>
					</div>
				</div>

				{/* Buttons */}
				<div className="chosen-article-actions">
					<Button
						className={`chosen-article-like-btn ${liked ? "liked" : ""}`}
						fullWidth
						startIcon={liked ? <Favorite /> : <FavoriteBorder />}
						onClick={() => setLiked(!liked)}>
						{liked ? "Liked" : "Like Article"}
					</Button>
					<Button className="chosen-article-share-btn" fullWidth>
						Share
					</Button>
				</div>
			</div>
		</div>
	);
}
