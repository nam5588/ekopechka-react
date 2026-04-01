import {
	ProductSize,
	ProductStatus,
	ProductType,
	ProductVolume,
} from "../enums/product.enum";

export interface Product {
	_id: string;
	productName: string;
	productPrice: number;
	productType: ProductType;
	productStatus: ProductStatus;
	productLeftCount: number;
	productSize: ProductSize;
	productVolume: ProductVolume;
	productDesc: string;
	productImages: string[];
	productViews: number;
	productLikes: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface ProductInquiry {
	order: string;
	page: number;
	limit: number;
	productType?: ProductType;
	search?: string;
}
