import React, { useEffect } from "react";
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
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { Article } from "../../../lib/types/article";
import { setChosenArticle, setNewArticlesSug } from "./slice";
import { retrieveChosenArticle } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import ArticleService from "../../services/ArticleService";
import { getImageUrl } from "../../../lib/config";
import { useTranslation } from "../../i18n/LanguageContext";

const actionDispatch = (dispatch: Dispatch) => ({
	setChosenArticle: (data: Article) => dispatch(setChosenArticle(data)),
	setNewArticlesSug: (data: Article[]) => dispatch(setNewArticlesSug(data)),
});

const chosenArticleRetriever = createSelector(
	retrieveChosenArticle,
	(article) => ({
		article,
	}),
);

export default function ChosenArticle() {
	const { setChosenArticle, setNewArticlesSug } = actionDispatch(useDispatch());
	const { article } = useSelector(chosenArticleRetriever);

	const { articleId } = useParams<{ articleId: string }>();
	const history = useHistory();
	const { t } = useTranslation();

	const [liked, setLiked] = React.useState(false);

	useEffect(() => {
		const product = new ArticleService();
		console.log("id:", articleId);

		product
			.getArticle(articleId)
			.then((data) => setChosenArticle(data))
			.catch((err) => console.log(err));
		product
			.getArticles({ page: 1, limit: 3, order: "articleViews" })
			.then((data) => {
				setNewArticlesSug(data);
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [articleId]);

	if (!article) return null;

	return (
		<div className="chosen-article-page">
			<div className="chosen-article-card">
				{/* Back */}
				<button
					className="chosen-article-back"
					onClick={() => history.push("/articles")}>
					<ArrowBack fontSize="small" /> {t.articles.back}
				</button>

				{/* Hero Image */}
				<div className="chosen-article-img-wrap">
					<img
						src={getImageUrl(article.articleImage)}
						alt={""}
						className="chosen-article-img"
					/>
				</div>

				{/* Category + Title + Meta */}
				<div className="chosen-article-header">
					<span className="chosen-article-category">
						{t.articles.categoryNames[article.articleCategory?.trim()] ??
							article.articleCategory}
					</span>
					<h1 className="chosen-article-title">{article.articleTitle}</h1>
					<div className="chosen-article-meta">
						<span className="chosen-article-meta-item">
							<CalendarToday fontSize="small" />{" "}
							{new Date(article.createdAt).toLocaleDateString(t.dateLocale)}
						</span>
						<span className="chosen-article-meta-item">
							<FavoriteBorder fontSize="small" />
							{t.articles.likes(article.articleLikes + (liked ? 1 : 0))}
						</span>
						<span className="chosen-article-meta-item">
							<Visibility fontSize="small" /> {t.articles.views(article.articleViews)}
						</span>
					</div>
				</div>

				<div className="chosen-article-divider" />

				{/* Content */}
				<div className="chosen-article-content">{article.articleContent}</div>

				{/* Location & Contact */}
				<div className="chosen-article-location-box">
					<div className="chosen-article-location-title">
						<LocationOn fontSize="small" />
						<strong>{t.articles.locationContact}</strong>
					</div>
					<div className="chosen-article-location-grid">
						<div>
							<h3 className="chosen-article-location-heading">
								{t.articles.hq}
							</h3>
							{t.articles.addressLines.map((line) => (
								<p key={line}>{line}</p>
							))}
						</div>
						<div>
							<h3 className="chosen-article-location-heading">
								{t.articles.contactInfo}
							</h3>
							<p>
								{t.articles.email}: <bdi>mukhammad5589@gmail.com</bdi>
							</p>
							<p>
								{t.articles.phone}: <bdi>+998 93 491-7500</bdi>
							</p>
							<p>{t.articles.hours}</p>
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
						{liked ? t.articles.liked : t.articles.like}
					</Button>
					<a style={{ textDecoration: "none" }} href="https://t.me/s/ekopechka">
						<Button className="chosen-article-share-btn" fullWidth>
							{t.articles.more}
						</Button>
					</a>
				</div>
			</div>
		</div>
	);
}
