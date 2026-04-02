import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectArticlePage = (state: AppRootState) => state.articlePage;
export const retrieveArticles = createSelector(
	selectArticlePage,
	(ArticlePage) => ArticlePage.articles,
);
export const retrieveChosenArticle = createSelector(
	selectArticlePage,
	(ArticlePage) => ArticlePage.chosenArticle,
);
export const retrieveNewArticlesSug = createSelector(
	selectArticlePage,
	(ArticlePage) => ArticlePage.newArticlesSug,
);
