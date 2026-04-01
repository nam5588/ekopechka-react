import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
	popularProducts: [],
	newProducts: [],
	popularArticles: [],
};

const homePageSlice = createSlice({
	name: "homePage",
	initialState,
	reducers: {
		setPopularProducts: (state, action) => {
			state.popularProducts = action.payload;
		},
		setNewProducts: (state, action) => {
			state.newProducts = action.payload;
		},
		setPopularArticles: (state, action) => {
			state.popularArticles = action.payload;
		},
	},
});

export const { setPopularProducts, setNewProducts, setPopularArticles } =
	homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;

export default HomePageReducer;
