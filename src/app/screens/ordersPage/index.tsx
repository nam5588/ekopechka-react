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
import { AdminContacts, Messages } from "../../../lib/config";
import Swal from "sweetalert2";
import {
	sweetErrorHandling,
	sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
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
		if (!authMember) return;
		const order = new OrderService();
		order
			.getMyOrders({ ...orderInquiry })
			.then((data) => setOrders(data))
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderInquiry, orderBuilder, authMember]);

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
	// Payment is handled by the admin directly (Stripe disabled): show contacts
	const paymentContactHandler = (order: Order) => {
		if (!authMember) {
			sweetErrorHandling(Messages.error2).then();
			return;
		}
		const orderNo = `ORD-${order._id.slice(0, 10)}`;
		const btn = (href: string, label: string, bg: string) =>
			`<a href="${href}" target="_blank" rel="noreferrer" style="display:block;padding:12px;margin:8px 0;border-radius:10px;background:${bg};color:#fff;text-decoration:none;font-weight:600">${label}</a>`;

		Swal.fire({
			title: t.orders.payTitle,
			html:
				`<p style="margin:0 0 12px">${t.orders.payDesc(orderNo, order.orderTotal)}</p>` +
				AdminContacts.phones
					.map((p) => btn(`tel:${p.replace(/[^+\d]/g, "")}`, `📞 ${t.orders.payCall}: <bdi>${p}</bdi>`, "#6b8e6f"))
					.join("") +
				btn(AdminContacts.telegram, `✈️ ${t.orders.payTelegram}`, "#229ED9") +
				btn(`mailto:${AdminContacts.email}?subject=${encodeURIComponent(orderNo)}`, `✉️ ${t.orders.payEmail}: ${AdminContacts.email}`, "#555") +
				`<p style="margin:12px 0 0;font-size:13px;color:#666">${t.orders.payNote}</p>`,
			showConfirmButton: true,
			confirmButtonText: t.orders.close,
			confirmButtonColor: "#333",
		});
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
											onClick={() => paymentContactHandler(order)}
											className="order-btn-track"
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
