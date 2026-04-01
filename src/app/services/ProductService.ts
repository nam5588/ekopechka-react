import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/products";

class ProductService {
	private readonly path: string;
	constructor() {
		this.path = serverApi;
	}

	public async getProducts(input: ProductInquiry): Promise<Product[]> {
		try {
			let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
			if (input.productType) url += `&productType=${input.productType}`;
			if (input.search) url += `&search=${input.search}`;
			const result = await axios.get(url);
			return result.data;
		} catch (err) {
			console.log("Error, getProducts", err);
			throw err;
		}
	}
}

export default ProductService;
