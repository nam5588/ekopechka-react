import React, { useState } from "react";
import { Container } from "@mui/material";
import { FavoriteBorder, Star, Visibility } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import ArticleCard from "../../components/cards/articleCard";
import ArticleListCard from "../../components/cards/articleListCard";

const categories = ["All", "Events", "News", "Advice", "Fuels", "Others"];
const allArticles = [
	{
		id: 1,
		title: "Natural Soap Set",
		desc: "Hand-made soap from natural ingredients",
		likes: 312,
		views: 1543,
		date: "2026.06.02",
		img: "/img/product4.jpg",
		category: "Beauty",
	},
	{
		id: 2,
		title: "Natural Soap Set",
		desc: "Hand-made soap from natural ingredients",
		likes: 312,
		views: 1543,
		date: "2026.06.02",
		img: "/img/product4.jpg",
		category: "Beauty",
	},
	{
		id: 3,
		category: "Beauty",
		title: "Natural Soap Set",
		desc: "Hand-made soap from natural ingredients",
		date: "2026.06.02",
		likes: 312,
		views: 1543,
		img: "/img/product4.jpg",
	},
	{
		id: 4,
		title: "Natural Soap Set",
		desc: "Hand-made soap from natural ingredients",
		likes: 312,
		views: 1543,
		date: "2026.06.02",
		img: "/img/product4.jpg",
		category: "Beauty",
	},
];

export default function Articles() {
	const [activeCategory, setActiveCategory] = useState("All");
	const [search, setSearch] = useState("");

	const filtered = allArticles.filter((a) => {
		const matchCat = activeCategory === "All" || a.category === activeCategory;
		const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
		return matchCat && matchSearch;
	});

	return (
		<div className="articles-page">
			{/* Hero */}
			<div className="articles-hero">
				<Container>
					<h1 className="articles-hero-title">Articles</h1>
					<p className="articles-hero-desc">
						Explore our collection of eco-friendly tips and insights
					</p>
				</Container>
			</div>

			{/* Content */}
			<div className="articles-content">
				<Container>
					{/* Filter bar */}
					<div className="articles-filter-bar">
						<div className="articles-cats">
							{categories.map((cat) => (
								<button
									key={cat}
									className={`articles-cat-btn ${activeCategory === cat ? "active" : ""}`}
									onClick={() => setActiveCategory(cat)}>
									{cat}
								</button>
							))}
						</div>
						<input
							className="articles-search"
							type="text"
							placeholder="Search articles..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>

					{/* Count */}
					<p className="articles-count">{filtered.length} articles found</p>

					{/* List */}
					<div className="articles-list">
						{filtered.map((article) => (
							<ArticleListCard key={article.id} {...article} />
						))}
					</div>
				</Container>
			</div>
		</div>
	);
}
