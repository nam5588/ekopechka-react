import { OrderStatus } from "../enums/order.enum";
import { Product } from "./products";

export interface Order {
	_id: string;
	orderTotal: number;
	orderDelivery: number;
	orderStatus: OrderStatus;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	orderItems: OrderItem[];
	productData: Product[];
}

export interface OrderItem {
	_id: string;
	itemQuantity: number;
	itemPrice: number;
	orderId?: string;
	productId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderItemInput {
	itemQuantity: number;
	itemPrice: number;
	productId: string;
	orderId?: string;
}

export interface OrderInquiry {
	page: number;
	limit: number;
	orderStatus?: OrderStatus;
}

export interface OrderUpdateInput {
	orderId: string;
	orderStatus: OrderStatus;
}
