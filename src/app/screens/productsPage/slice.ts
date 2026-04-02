import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../../lib/types/screen";

const initialState: ProductPageState = {
	products: [],
	newProductsSug: [],
	chosenProduct: null,
};

const productPageSlice = createSlice({
	name: "productPage",
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.products = action.payload;
		},
		setChosenProduct: (state, action) => {
			state.chosenProduct = action.payload;
		},
		setNewProductsSug: (state, action) => {
			state.newProductsSug = action.payload;
		},
	},
});

export const { setProducts, setChosenProduct, setNewProductsSug } =
	productPageSlice.actions;

const ProductPageReducer = productPageSlice.reducer;

export default ProductPageReducer;
