import React from "react";
import { FavoriteBorder, Visibility } from "@mui/icons-material";

interface ArticleCardProps {
	id: number;
	category: string;
	title: string;
	desc: string;
	date: string;
	likes: number;
	views: number;
	img: string;
}

export default function ArticleCard({
	category,
	title,
	desc,
	date,
	likes,
	views,
	img,
}: ArticleCardProps) {
	return (
		<div className="article-card">
			<div className="article-img-wrap">
				<img src={img} alt={title} className="article-img" />
			</div>
			<div className="article-body">
				<span className="article-category">{category}</span>
				<h3 className="article-name">{title}</h3>
				<p className="article-desc">{desc}</p>
				<div className="article-author-row">
					<span className="article-date">{date}</span>
				</div>
				<div className="article-meta">
					<span className="article-meta-item">
						<FavoriteBorder fontSize="small" /> {likes}
					</span>
					<span className="article-meta-item">
						<Visibility fontSize="small" /> {views}
					</span>
				</div>
			</div>
		</div>
	);
}
