import { createSlice } from "@reduxjs/toolkit";
import { ArticlePageState } from "../../../lib/types/screen";

const initialState: ArticlePageState = {
	articles: [],
	chosenArticle: null,
	newArticlesSug: [],
};

const articlePageSlice = createSlice({
	name: "articlePage",
	initialState,
	reducers: {
		setArticles: (state, action) => {
			state.articles = action.payload;
		},
		setChosenArticle: (state, action) => {
			state.chosenArticle = action.payload;
		},
		setNewArticlesSug: (state, action) => {
			state.newArticlesSug = action.payload;
		},
	},
});

export const { setArticles, setChosenArticle, setNewArticlesSug } =
	articlePageSlice.actions;

const ArticlePageReducer = articlePageSlice.reducer;

export default ArticlePageReducer;
