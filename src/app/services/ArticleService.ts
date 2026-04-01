import axios from "axios";
import { serverApi } from "../../lib/config";
import { Article, ArticleInquiry } from "../../lib/types/article";

class ArticleService {
	private readonly path: string;
	constructor() {
		this.path = serverApi;
	}

	public async getArticles(input: ArticleInquiry): Promise<Article[]> {
		try {
			let url = `${this.path}/article/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
			if (input.articleCategoty) url += `&productType=${input.articleCategoty}`;
			if (input.search) url += `&search=${input.search}`;
			const result = await axios.get(url);
			return result.data;
		} catch (err) {
			console.log("Error, getArticles", err);
			throw err;
		}
	}
}

export default ArticleService;
