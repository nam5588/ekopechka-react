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
import { Order, OrderInquiry } from "../../../lib/types/order";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { retrieveOrders } from "./selector";
import { Product } from "../../../lib/types/products";
import { Messages, serverApi } from "../../../lib/config";
import {
	sweetErrorHandling,
	sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";
import axios from "axios";
import { useTranslation } from "../../i18n/LanguageContext";

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
	const { orderBuilder, authMember } = useGlobals();
	const history = useHistory();
	const { t } = useTranslation();

	const [orderInquiry] = useState<OrderInquiry>({
		page: 1,
		limit: 10,
	});

	useEffect(() => {
		const order = new OrderService();
		order
			.getMyOrders({ ...orderInquiry })
			.then((data) => setOrders(data))
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderInquiry, orderBuilder]);

	useEffect(() => {
		if (!authMember) history.push("/");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authMember]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		if (params.get("payment") === "success") {
			sweetTopSuccessAlert(t.orders.paidSuccess);
			window.history.replaceState({}, "", "/orders");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/** HANDLERS **/
	const finishedOrderHandler = async (e: T) => {
		try {
			if (!authMember) throw new Error(Messages.error2);
			const orderId = e.target.value;

			const confirmation = window.confirm(t.orders.confirmPay);
			if (confirmation) {
				const order = orders.find((o: Order) => o._id === orderId);
				if (!order) throw new Error(t.orders.notFound);

				const res = await axios.post(
					`${serverApi}/api/stripe/create-session`,
					{
						orderId: orderId,
						amount: order.orderTotal,
						orderName: `EkoPechka Order`,
					},
				);
				window.location.href = res.data.url;
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
					<h1 className="orders-hero-title">{t.orders.heroTitle}</h1>
					<p className="orders-hero-desc">{t.orders.heroDesc}</p>
				</Container>
			</div>

			{/* Orders List */}
			<div className="orders-content">
				<Container>
					{orders.length === 0 && (
						<div className="orders-empty">
							<LocalShippingOutlined className="orders-empty-icon" />
							<h3>{t.orders.emptyTitle}</h3>
							<p>{t.orders.emptyDesc}</p>
							<a href="/products">
								<Button className="orders-empty-btn">{t.orders.letsShop}</Button>
							</a>
						</div>
					)}
					{orders.map((order: Order) => {
						const steps = [
							{
								icon: "time",
								label: t.orders.placed,
								sub: new Date(order.createdAt).toLocaleDateString(t.dateLocale),
								done: true,
							},
							{
								icon: "box",
								label: t.orders.processing,
								sub:
									order.orderStatus === OrderStatus.PROCESS
										? t.orders.inProgress
										: "",
								done:
									order.orderStatus === OrderStatus.PROCESS ||
									order.orderStatus === OrderStatus.FINISH,
							},
							{
								icon: "check",
								label: t.orders.delivered,
								sub:
									order.orderStatus === OrderStatus.FINISH
										? new Date(order.updatedAt).toLocaleDateString(t.dateLocale)
										: "",
								done: order.orderStatus === OrderStatus.FINISH,
							},
						];

						return (
							<div className="order-card" key={order._id}>
								{/* Header Row */}
								<div className="order-header-row">
									<div className="order-header-item">
										<span className="order-header-label">{t.orders.orderNumber}</span>
										<span className="order-header-value">
											ORD-{order._id.slice(0, 10)}
										</span>
									</div>
									<div className="order-header-item">
										<span className="order-header-label">{t.orders.orderDate}</span>
										<span className="order-header-value">
											{new Date(order.createdAt).toLocaleDateString(t.dateLocale)}
										</span>
									</div>
									<div className="order-header-item">
										<span className="order-header-label">{t.orders.totalAmount}</span>
										<span className="order-header-value order-total">
											${order.orderTotal}
										</span>
									</div>
									<div className="order-header-item">
										<span className="order-header-label">{t.orders.status}</span>
										<span className={`order-status-badge ${order.orderStatus}`}>
											<CheckCircleOutline fontSize="small" />
											{t.orders.statusNames[order.orderStatus] ?? order.orderStatus}
										</span>
									</div>
								</div>

								{/* Items */}
								<div className="order-section">
									<h3 className="order-section-title">{t.orders.items}</h3>
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
															{t.orders.quantity}: {item.itemQuantity}
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
									<h3 className="order-section-title">{t.orders.deliveryStatus}</h3>
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
											<p className="order-delivery-title">{t.orders.estimated}</p>
											<p className="order-delivery-date">
												{order.orderStatus === OrderStatus.FINISH
													? t.orders.deliveredOn(
															new Date(order.updatedAt).toLocaleDateString(t.dateLocale),
														)
													: t.orders.expectedSoon}
											</p>
										</div>
									</div>
								</div>

								{/* Actions */}
								<div className="order-actions">
									{order.orderStatus === OrderStatus.PAUSE ? (
										<Button
											onClick={finishedOrderHandler}
											className="order-btn-track"
											value={order._id}
											fullWidth>
											{t.orders.pay}
										</Button>
									) : order.orderStatus === OrderStatus.PROCESS ? (
										<Button className="order-btn-track" disabled fullWidth>
											{t.orders.processingBtn}
										</Button>
									) : (
										<Button className="order-btn-track" disabled fullWidth>
											{t.orders.deliveredBtn}
										</Button>
									)}
									<a href="/help">
										<Button className="order-btn-support" fullWidth>
											{t.orders.contactSupport}
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
