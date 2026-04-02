import { ArticleCategory, ArticleStatus } from "../enums/article.enum";

export interface Article {
	_id: string;
	articleTitle: string;
	articleContent: string;
	articleCategory: ArticleCategory;
	articleStatus: ArticleStatus;
	articleImage: string;
	articleVideo: string;
	articleViews: number;
	articleLikes: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface ArticleInquiry {
	order: string;
	page: number;
	limit: number;
	articleCategory?: ArticleCategory;
	search?: string;
}
