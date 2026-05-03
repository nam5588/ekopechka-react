import React, { ChangeEvent, useEffect, useState } from "react";
import { Container, Pagination, PaginationItem, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ArticleCategory } from "../../../lib/enums/article.enum";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setArticles } from "./slice";
import { Article, ArticleInquiry } from "../../../lib/types/article";
import { retrieveArticles } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ArticleService from "../../services/ArticleService";
import { CalendarToday, Visibility } from "@mui/icons-material";
import { serverApi } from "../../../lib/config";

const categories = [
	{ label: "All", value: undefined },
	{ label: "News", value: ArticleCategory.NEWS },
	{ label: "Advice", value: ArticleCategory.ADVICE },
	{ label: "Stoves", value: ArticleCategory.STOVE },
	{ label: "Fuels", value: ArticleCategory.FUEL },
	{ label: "Others", value: ArticleCategory.OTHER },
];

const actionDispatch = (dispatch: Dispatch) => ({
	setArticles: (data: Article[]) => dispatch(setArticles(data)),
});

const articlesRetriever = createSelector(retrieveArticles, (articles) => ({
	articles,
}));

export default function Articles() {
	const { setArticles } = actionDispatch(useDispatch());
	const { articles } = useSelector(articlesRetriever);
	const history = useHistory();

	const [articleSearch, setArticleSearch] = useState<ArticleInquiry>({
		page: 1,
		limit: 4,
		order: "createdAt",
		search: "",
		articleCategory: undefined,
	});

	const [searchText, setSearchText] = useState<string>("");
	const [activeCategory, setActiveCategory] = useState<string>("All");

	useEffect(() => {
		const article = new ArticleService();
		article
			.getArticles(articleSearch)
			.then((data) => setArticles(data))
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [articleSearch]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setArticleSearch((prev) => ({ ...prev, page: 1, search: searchText }));
		}, 500);
		return () => clearTimeout(timer);
	}, [searchText]);

	/** HANDLERS **/
	const categoryHandler = (
		label: string,
		value: ArticleCategory | undefined,
	) => {
		setActiveCategory(label);
		setArticleSearch((prev) => ({ ...prev, page: 1, articleCategory: value }));
	};

	const paginationHandler = (_e: ChangeEvent<any>, value: number) => {
		setArticleSearch((prev) => ({ ...prev, page: value }));
	};

	const chooseArticleHandler = (id: string) => {
		history.push(`/articles/${id}`);
	};

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
									style={{ border: "none" }}
									key={cat.label}
									className={`sidebar-cat-item ${activeCategory === cat.label ? "active" : ""}`}
									onClick={() => categoryHandler(cat.label, cat.value)}>
									{cat.label}
								</button>
							))}
						</div>
						<input
							className="articles-search"
							type="text"
							placeholder="Search articles..."
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</div>

					{/* Count */}
					<p className="articles-count">{articles.length} articles found</p>

					{/* List */}
					<div className="articles-list">
						{articles.map((article) => (
							<div
								key={article._id}
								className="article-list-card"
								onClick={() => chooseArticleHandler(article._id)}>
								<div className="article-list-img-wrap">
									<img
										src={`${serverApi}/${article.articleImage}`}
										alt={""}
										className="article-list-img"
									/>
								</div>
								<div className="article-list-body">
									<span className="article-list-category">
										{article.articleCategory}
									</span>
									<h3 className="article-list-title">{article.articleTitle}</h3>
									<p className="article-list-desc">
										{article.articleContent.slice(0, 110) + "..."}
									</p>
									<div className="article-list-meta">
										<span className="article-list-meta-item">
											<CalendarToday fontSize="small" />{" "}
											{new Date(article.createdAt).toLocaleDateString("en-GB")}
										</span>

										<span className="article-list-meta-item">
											<Visibility fontSize="small" /> {article.articleViews}
										</span>
									</div>
								</div>
							</div>
						))}
						<Stack className="pagination-section">
							<Pagination
								count={
									articles.length !== 0
										? articleSearch.page + 1
										: articleSearch.page
								}
								page={articleSearch.page}
								renderItem={(item) => (
									<PaginationItem
										components={{
											previous: ArrowBackIcon,
											next: ArrowForwardIcon,
										}}
										{...item}
									/>
								)}
								onChange={paginationHandler}
							/>
						</Stack>
					</div>
				</Container>
			</div>
		</div>
	);
}
