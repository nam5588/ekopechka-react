import { Article } from "./article";
import { Order } from "./order";
import { Product } from "./products";

export interface AppRootState {
	homePage: HomePageState;
	productPage: ProductPageState;
	articlePage: ArticlePageState;
	ordersPage: OrdersPageState;
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
export interface ArticlePageState {
	articles: Article[];
	newArticlesSug: Article[];
	chosenArticle: Article | null;
}
export interface OrdersPageState {
	orders: Order[];
}
