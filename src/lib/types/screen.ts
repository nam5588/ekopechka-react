import { Article } from "./article";
import { Product } from "./products";

export interface AppRootState {
	homePage: HomePageState;
}

export interface HomePageState {
	popularProducts: Product[];
	newProducts: Product[];
	popularArticles: Article[];
}

export interface HomePageState {
	popularProducts: Product[];
	newProducts: Product[];
	popularArticles: Article[];
}
