import React from "react";
import { Container } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";
import { FavoriteBorder, Visibility } from "@mui/icons-material";
import { createSelector } from "@reduxjs/toolkit";
import { retrievePopularArticles } from "./selector";
import { useSelector } from "react-redux";
import { getImageUrl } from "../../../lib/config";

/** REDUX SLICE & SELECTOR **/
const popularArticleRetriever = createSelector(
	retrievePopularArticles,
	(popularArticles) => ({ popularArticles }),
);

export default function Events() {
	const { popularArticles } = useSelector(popularArticleRetriever);
	const history = useHistory();

	const chooseArticleHandler = (id: string) => {
		history.push(`/articles/${id}`);
	};

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
					{popularArticles.map((article) => {
						const date = new Date(article.createdAt).toLocaleString("en-GB", {
							year: "numeric",
							month: "2-digit",
							day: "2-digit",
							hour: "2-digit",
							minute: "2-digit",
						});

						return (
							<div
								id={article._id}
								className="article-card"
								onClick={() => chooseArticleHandler(article._id)}>
								<div className="article-img-wrap">
									<img
										src={getImageUrl(article.articleImage)}
										alt={""}
										className="article-img"
									/>
								</div>
								<div className="article-body">
									<span className="article-category">
										{article.articleCategory}
									</span>
									<h3 className="article-name">{article.articleTitle}</h3>
									<p className="article-desc">
										{article.articleContent.slice(0, 100) + "..."}
									</p>
									<div className="article-desc">
										<div className="article-author-row">
											<span className="article-date">{date}</span>
										</div>
										<div className="article-meta">
											<span className="article-meta-item">
												<FavoriteBorder fontSize="small" />
												{article.articleLikes}
											</span>
											<span className="article-meta-item">
												<Visibility fontSize="small" /> {article.articleViews}
											</span>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</Container>
		</div>
	);
}
