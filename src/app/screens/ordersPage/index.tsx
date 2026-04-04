import React, { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import {
	AccessTime,
	Inventory2Outlined,
	CheckCircleOutline,
	LocalShippingOutlined,
} from "@mui/icons-material";
import "../../../css/orders.css";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { setOrders } from "./slice";
import {
	Order,
	OrderInquiry,
	OrderUpdateInput,
} from "../../../lib/types/order";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { retrieveOrders } from "./selector";
import { Product } from "../../../lib/types/products";
import { Messages } from "../../../lib/config";
import {
	sweetErrorHandling,
	sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";

function StepIcon({ icon, done }: { icon: string; done: boolean }) {
	return (
		<div className={`order-step-icon ${done ? "done" : ""}`}>
			{icon === "time" && <AccessTime fontSize="small" />}
			{icon === "box" && <Inventory2Outlined fontSize="small" />}
			{icon === "check" && <CheckCircleOutline fontSize="small" />}
		</div>
	);
}

const actionDispatch = (dispatch: Dispatch) => ({
	setOrders: (data: Order[]) => dispatch(setOrders(data)),
});

const ordersRetriever = createSelector(retrieveOrders, (orders) => ({
	orders,
}));

export default function OrdersPage() {
	const { setOrders } = actionDispatch(useDispatch());
	const { orders } = useSelector(ordersRetriever);
	const { orderBuilder, authMember, setOrderBuilder } = useGlobals();
	const history = useHistory();

	const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
		page: 1,
		limit: 10,
	});

	useEffect(() => {
		const order = new OrderService();
		order
			.getMyOrders({ ...orderInquiry })
			.then((data) => setOrders(data))
			.catch((err) => console.log(err));
	}, [orderInquiry, orderBuilder]);

	useEffect(() => {
		if (!authMember) history.push("/");
	}, [authMember]);

	/** HANDLERS **/
	const finishedOrderHandler = async (e: T) => {
		try {
			if (!authMember) throw new Error(Messages.error2);
			const orderId = e.target.value;

			const confirmation = window.confirm(
				"Do you want to process with payment?",
			);
			if (confirmation) {
				const order = new OrderService();

				const input: OrderUpdateInput = {
					orderId: orderId,
					orderStatus: OrderStatus.PROCESS,
				};
				await order.updateOrder(input);
				setOrderBuilder(new Date());

				const timer = setTimeout(async () => {
					try {
						const inputFinish: OrderUpdateInput = {
							orderId: orderId,
							orderStatus: OrderStatus.FINISH,
						};
						await order.updateOrder(inputFinish);
						setOrderBuilder(new Date());
						sweetTopSuccessAlert("Your order has been delivered successfully");
					} catch (err) {
						sweetErrorHandling(err).then();
					}
				}, 10000);
				// 259200000 - 3 days
				// 10000 - 10 sec

				return () => clearTimeout(timer);
			}
		} catch (err) {
			console.log(err);
			sweetErrorHandling(err).then();
		}
	};

	return (
		<div className="orders-page">
			{/* Hero */}
			<div className="orders-hero">
				<Container>
					<h1 className="orders-hero-title">My Orders</h1>
					<p className="orders-hero-desc">Track and manage your orders</p>
				</Container>
			</div>

			{/* Orders List */}
			<div className="orders-content">
				<Container>
					{orders.length === 0 && (
						<div className="orders-empty">
							<LocalShippingOutlined className="orders-empty-icon" />
							<h3>No orders yet</h3>
							<p>
								Looks like you haven't placed any orders. Explore our
								eco-friendly products and make your first order!
							</p>
							<a href="/products">
								<Button className="orders-empty-btn">Let's Shop 🌿</Button>
							</a>
						</div>
					)}
					{orders.map((order: Order) => {
						const steps = [
							{
								icon: "time",
								label: "Order Placed",
								sub: new Date(order.createdAt).toLocaleDateString("en-GB"),
								done: true,
							},
							{
								icon: "box",
								label: "Processing",
								sub:
									order.orderStatus === OrderStatus.PROCESS
										? "In progress"
										: "",
								done:
									order.orderStatus === OrderStatus.PROCESS ||
									order.orderStatus === OrderStatus.FINISH,
							},
							{
								icon: "check",
								label: "Delivered",
								sub:
									order.orderStatus === OrderStatus.FINISH
										? new Date(order.updatedAt).toLocaleDateString("en-GB")
										: "",
								done: order.orderStatus === OrderStatus.FINISH,
							},
						];

						return (
							<div className="order-card" key={order._id}>
								{/* Header Row */}
								<div className="order-header-row">
									<div className="order-header-item">
										<span className="order-header-label">Order Number</span>
										<span className="order-header-value">
											ORD-{order._id.slice(0, 10)}
										</span>
									</div>
									<div className="order-header-item">
										<span className="order-header-label">Order Date</span>
										<span className="order-header-value">
											{new Date(order.createdAt).toLocaleDateString("en-GB")}
										</span>
									</div>
									<div className="order-header-item">
										<span className="order-header-label">Total Amount</span>
										<span className="order-header-value order-total">
											${order.orderTotal}
										</span>
									</div>
									<div className="order-header-item">
										<span className="order-header-label">Status</span>
										<span className={`order-status-badge ${order.orderStatus}`}>
											<CheckCircleOutline fontSize="small" />
											{order.orderStatus}
										</span>
									</div>
								</div>

								{/* Items */}
								<div className="order-section">
									<h3 className="order-section-title">Items</h3>
									<div className="order-items">
										{order.orderItems.map((item, i) => {
											const product: Product | undefined =
												order.productData.find(
													(ele: Product) => item.productId === ele._id,
												);

											return (
												<div className="order-item-row" key={i}>
													<div>
														<p className="order-item-name">
															{product?.productName}
														</p>
														<p className="order-item-qty">
															Quantity: {item.itemQuantity}
														</p>
													</div>
													<span className="order-item-price">
														${product?.productPrice}
													</span>
												</div>
											);
										})}
									</div>
								</div>

								{/* Delivery Status */}
								<div className="order-section">
									<h3 className="order-section-title">Delivery Status</h3>
									<div className="order-steps">
										{steps.map((step, i) => (
											<React.Fragment key={i}>
												<div className="order-step">
													<StepIcon icon={step.icon} done={step.done} />
													<p className="order-step-label">{step.label}</p>
													<p className="order-step-sub">{step.sub}</p>
												</div>
												{i < steps.length - 1 && (
													<div
														className={`order-step-line ${step.done ? "done" : ""}`}
													/>
												)}
											</React.Fragment>
										))}
									</div>

									{/* Estimated Delivery */}
									<div className="order-delivery-box">
										<LocalShippingOutlined fontSize="small" />
										<div>
											<p className="order-delivery-title">Estimated Delivery</p>
											<p className="order-delivery-date">
												{order.orderStatus === OrderStatus.FINISH
													? `Delivered on ${new Date(order.updatedAt).toLocaleDateString("en-GB")}`
													: `Expected soon`}
											</p>
										</div>
									</div>
								</div>

								{/* Actions */}
								<div className="order-actions">
									<Button
										onClick={finishedOrderHandler}
										className="order-btn-track"
										value={order._id}
										fullWidth>
										Next Step
									</Button>
									<a href="/help">
										<Button className="order-btn-support" fullWidth>
											Contact Support
										</Button>
									</a>
								</div>
							</div>
						);
					})}
				</Container>
			</div>
		</div>
	);
}
