import React from "react";
import { Container } from "@mui/material";
import { FavoriteBorder, Visibility } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import ArticleCard from "../../components/cards/articleCard";

const articles = [
	{
		id: 1,
		category: "Fashion",
		title: "The Impact of Sustainable Fashion",
		desc: "Learn how sustainable fashion is changing the industry",
		author: "Sarah Johnson",
		date: "2024-03-20",
		likes: 456,
		views: 2341,
		img: "/img/article1.jpg",
	},
	{
		id: 2,
		category: "Lifestyle",
		title: "Zero Waste Living: A Beginner's Guide",
		desc: "Start your zero waste journey with these practical tips",
		author: "Michael Chen",
		date: "2024-03-18",
		likes: 678,
		views: 3456,
		img: "/img/article2.jpg",
	},
	{
		id: 3,
		category: "Technology",
		title: "Renewable Energy Solutions for Your Home",
		desc: "Explore renewable energy options for sustainable living",
		author: "Emma Wilson",
		date: "2024-03-15",
		likes: 534,
		views: 2876,
		img: "/img/article3.jpg",
	},
];

export default function Events() {
	return (
		<div className="events-frame">
			<Container>
				{/* Header */}
				<div className="events-header">
					<h2 className="events-title">Useful Information</h2>
					<NavLink to={"/articles"} className="events-read-all">
						Read All →
					</NavLink>
				</div>

				{/* Grid */}
				<div className="events-grid">
					{articles.map((article) => (
						<ArticleCard key={article.id} {...article} />
					))}
				</div>
			</Container>
		</div>
	);
}
