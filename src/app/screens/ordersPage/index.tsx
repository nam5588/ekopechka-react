import React from "react";
import { Button, Container } from "@mui/material";
import {
	AccessTime,
	Inventory2Outlined,
	CheckCircleOutline,
	LocalShippingOutlined,
} from "@mui/icons-material";
import "../../../css/orders.css";

const orders = [
	{
		id: "ORD-2024-001",
		date: "2024-03-25",
		total: 89.97,
		status: "Delivered",
		statusLabel: "Delivered (Yetkazildi)",
		items: [
			{ name: "Organic Cotton T-Shirt", qty: 2, price: 59.98 },
			{ name: "Bamboo Water Bottle", qty: 1, price: 24.99 },
		],
		deliveryDate: "2024-03-28",
		steps: [
			{ icon: "time", label: "Order Placed", sub: "2024-03-25", done: true },
			{ icon: "box", label: "Processing", sub: "In progress", done: true },
			{ icon: "check", label: "Delivered", sub: "2024-03-28", done: true },
		],
	},
	{
		id: "ORD-2024-002",
		date: "2024-03-28",
		total: 49.99,
		status: "Processing",
		statusLabel: "Processing",
		items: [{ name: "Solar Power Bank", qty: 1, price: 49.99 }],
		deliveryDate: "2024-04-02",
		steps: [
			{ icon: "time", label: "Order Placed", sub: "2024-03-28", done: true },
			{ icon: "box", label: "Processing", sub: "In progress", done: true },
			{ icon: "check", label: "Delivered", sub: "Pending", done: true },
		],
	},
];

function StepIcon({ icon, done }: { icon: string; done: boolean }) {
	return (
		<div className={`order-step-icon ${done ? "done" : ""}`}>
			{icon === "time" && <AccessTime fontSize="small" />}
			{icon === "box" && <Inventory2Outlined fontSize="small" />}
			{icon === "check" && <CheckCircleOutline fontSize="small" />}
		</div>
	);
}

export default function OrdersPage() {
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
					{orders.map((order) => (
						<div className="order-card" key={order.id}>
							{/* Header Row */}
							<div className="order-header-row">
								<div className="order-header-item">
									<span className="order-header-label">Order Number</span>
									<span className="order-header-value">{order.id}</span>
								</div>
								<div className="order-header-item">
									<span className="order-header-label">Order Date</span>
									<span className="order-header-value">{order.date}</span>
								</div>
								<div className="order-header-item">
									<span className="order-header-label">Total Amount</span>
									<span className="order-header-value order-total">
										${order.total}
									</span>
								</div>
								<div className="order-header-item">
									<span className="order-header-label">Status</span>
									<span
										className={`order-status-badge ${order.status.toLowerCase()}`}>
										<CheckCircleOutline fontSize="small" />
										{order.statusLabel}
									</span>
								</div>
							</div>

							{/* Items */}
							<div className="order-section">
								<h3 className="order-section-title">Items</h3>
								<div className="order-items">
									{order.items.map((item, i) => (
										<div className="order-item-row" key={i}>
											<div>
												<p className="order-item-name">{item.name}</p>
												<p className="order-item-qty">Quantity: {item.qty}</p>
											</div>
											<span className="order-item-price">${item.price}</span>
										</div>
									))}
								</div>
							</div>

							{/* Delivery Status */}
							<div className="order-section">
								<h3 className="order-section-title">Delivery Status</h3>
								<div className="order-steps">
									{order.steps.map((step, i) => (
										<React.Fragment key={i}>
											<div className="order-step">
												<StepIcon icon={step.icon} done={step.done} />
												<p className="order-step-label">{step.label}</p>
												<p className="order-step-sub">{step.sub}</p>
											</div>
											{i < order.steps.length - 1 && (
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
											{order.status === "Delivered"
												? `Delivered on ${order.deliveryDate}`
												: `Expected by ${order.deliveryDate}`}
										</p>
									</div>
								</div>
							</div>

							{/* Actions */}
							<div className="order-actions">
								<Button className="order-btn-track" fullWidth>
									Track Shipment
								</Button>
								<Button className="order-btn-support" fullWidth>
									Contact Support
								</Button>
							</div>
						</div>
					))}
				</Container>
			</div>
		</div>
	);
}
