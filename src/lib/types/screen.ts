import { Article } from "./article";
import { Product } from "./products";

export interface AppRootState {
	homePage: HomePageState;
	productPage: ProductPageState;
}

export interface HomePageState {
	popularProducts: Product[];
	newProducts: Product[];
	popularArticles: Article[];
}

export interface ProductPageState {
	products: Product[];
	newProductsSug: Product[];
	chosenProduct: Product | null;
}
