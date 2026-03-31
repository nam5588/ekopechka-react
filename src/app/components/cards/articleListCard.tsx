import React from "react";
import { FavoriteBorder, Visibility, CalendarToday } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

interface ArticleListCardProps {
	id: number;
	category: string;
	title: string;
	desc: string;
	date: string;
	likes: number;
	views: number;
	img: string;
}

export default function ArticleListCard({
	id,
	category,
	title,
	desc,
	date,
	likes,
	views,
	img,
}: ArticleListCardProps) {
	const history = useHistory();

	return (
		<div
			className="article-list-card"
			onClick={() => history.push(`/articles/${id}`)}>
			<div className="article-list-img-wrap">
				<img src={img} alt={title} className="article-list-img" />
			</div>
			<div className="article-list-body">
				<span className="article-list-category">{category}</span>
				<h3 className="article-list-title">{title}</h3>
				<p className="article-list-desc">{desc}</p>
				<div className="article-list-meta">
					<span className="article-list-meta-item">
						<CalendarToday fontSize="small" /> {date}
					</span>
					<span className="article-list-meta-item">
						<FavoriteBorder fontSize="small" /> {likes}
					</span>
					<span className="article-list-meta-item">
						<Visibility fontSize="small" /> {views}
					</span>
				</div>
			</div>
		</div>
	);
}
