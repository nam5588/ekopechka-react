import axios from "axios";
import { serverApi } from "../../lib/config";
import {
	Order,
	OrderInquiry,
	OrderItemInput,
	OrderUpdateInput,
} from "../../lib/types/order";
import { CartItem } from "../../lib/types/search";

class OrderService {
	private readonly path: string;

	constructor() {
		this.path = serverApi;
	}

	public async createOrder(input: CartItem[]): Promise<Order> {
		try {
			const orderItem: OrderItemInput[] = input.map((cartItem: CartItem) => {
				return {
					itemQuantity: cartItem.quantity,
					itemPrice: cartItem.price,
					productId: cartItem._id,
				};
			});

			const url = this.path + "/order/create";
			const result = await axios.post(url, orderItem, {
				withCredentials: true,
			});
			console.log("CREATE RES", result);

			return result.data;
		} catch (err) {
			console.log("Error, createOrder:", err);
			throw err;
		}
	}

	public async getMyOrders(input: OrderInquiry): Promise<Order[]> {
		try {
			// axios.defaults.withCredentials = true
			const url = `${this.path}/order/all`;
			let query = `?page=${input.page}&limit=${input.limit}`;
			if (input.orderStatus) {
				query += `&orderStatus=${input.orderStatus}`;
			}
			const result = await axios.get(url + query, { withCredentials: true });
			console.log("GET MY ORDERS RES", result);
			return result.data;
		} catch (err) {
			console.log("Error, getMyOrders:", err);
			throw err;
		}
	}

	public async updateOrder(input: OrderUpdateInput): Promise<Order> {
		try {
			const url = `${this.path}/order/update`;
			const result = await axios.post(url, input, { withCredentials: true });
			console.log("update ORDER", result);
			return result.data;
		} catch (err) {
			console.log("Error, updateOrder:", err);
			throw err;
		}
	}
}

export default OrderService;
