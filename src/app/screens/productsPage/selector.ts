import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectProductPage = (state: AppRootState) => state.productPage;
export const retrieveProducts = createSelector(
	selectProductPage,
	(ProductPage) => ProductPage.products,
);
export const retrieveChosenProduct = createSelector(
	selectProductPage,
	(ProductPage) => ProductPage.chosenProduct,
);
export const retrieveNewProductsSug = createSelector(
	selectProductPage,
	(ProductPage) => ProductPage.newProductsSug,
);
