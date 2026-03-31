import React, { useState } from "react";
import {
	ExpandMore,
	ExpandLess,
	MailOutline,
	PhoneOutlined,
	LocationOnOutlined,
} from "@mui/icons-material";
import "../../../css/help.css";
import { Container } from "@mui/material";

const faqs = [
	{
		q: "What does EkoPechka mean?",
		a: "EkoPechka combines 'Eco' (ecological) and 'Pechka' (stove in Russian), symbolizing warmth and sustainability. We are committed to providing eco-friendly products that warm both your home and the planet.",
	},
	{
		q: "Are all products organic?",
		a: "Yes, we carefully curate our products to ensure they meet strict organic and eco-friendly standards. Each product is vetted for sustainable sourcing and ethical manufacturing practices.",
	},
	{
		q: "What is your return policy?",
		a: "We offer a 30-day return policy for all products. Items must be unused and in original packaging. Simply contact our support team to initiate a return.",
	},
	{
		q: "Do you ship internationally?",
		a: "Yes, we ship to over 50 countries worldwide. International shipping times vary by location, typically 7–14 business days. Free shipping is available for orders over $75.",
	},
	{
		q: "How do you ensure product quality?",
		a: "Every product goes through a rigorous quality check process. We partner only with certified suppliers and conduct regular audits to ensure our standards are maintained.",
	},
];

const terms = [
	{
		title: "1. Acceptance of Terms",
		text: "By accessing and using EkoPechka, you accept and agree to be bound by the terms and provision of this agreement.",
	},
	{
		title: "2. Products and Services",
		text: "All products listed on EkoPechka are subject to availability. We reserve the right to discontinue any product at any time.",
	},
	{
		title: "3. Privacy Policy",
		text: "Your privacy is important to us. We collect and use your information only as described in our Privacy Policy, which is incorporated into these Terms.",
	},
	{
		title: "4. Shipping & Delivery",
		text: "We aim to process all orders within 1–2 business days. Delivery times vary by location and shipping method selected at checkout.",
	},
	{
		title: "5. Returns & Refunds",
		text: "Items may be returned within 30 days of delivery for a full refund, provided they are unused and in original condition.",
	},
];

function FaqAccordion() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<div className="help-faq">
			<h2 className="help-section-title">Frequently Asked Questions</h2>
			<div className="faq-list">
				{faqs.map((faq, i) => (
					<div
						className={`faq-item ${openIndex === i ? "open" : ""}`}
						key={i}
						onClick={() => setOpenIndex(openIndex === i ? null : i)}>
						<div className="faq-question">
							<span>{faq.q}</span>
							{openIndex === i ? (
								<ExpandLess fontSize="small" />
							) : (
								<ExpandMore fontSize="small" />
							)}
						</div>
						{openIndex === i && <div className="faq-answer">{faq.a}</div>}
					</div>
				))}
			</div>
		</div>
	);
}

function TermsContent() {
	return (
		<div className="help-terms">
			<h2 className="help-section-title">Terms & Conditions</h2>
			<p className="help-terms-intro">
				Last updated: March 2024. Please read these terms carefully before using
				EkoPechka.
			</p>
			<div className="terms-list">
				{terms.map((item, i) => (
					<div className="terms-item" key={i}>
						<h4 className="terms-item-title">{item.title}</h4>
						<p className="terms-item-text">{item.text}</p>
					</div>
				))}
			</div>
		</div>
	);
}

function ContactContent() {
	const [sent, setSent] = useState(false);
	const [form, setForm] = useState({ name: "", email: "", message: "" });

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<div className="help-contact">
			<h2 className="help-section-title">Contact Us</h2>
			<div className="contact-layout">
				{/* Info */}
				<div className="contact-info">
					<div className="contact-info-item">
						<MailOutline />
						<div>
							<p className="contact-info-label">Email</p>
							<p className="contact-info-value">info@ekopechka.com</p>
						</div>
					</div>
					<div className="contact-info-item">
						<PhoneOutlined />
						<div>
							<p className="contact-info-label">Phone</p>
							<p className="contact-info-value">+1 (555) 123-4567</p>
						</div>
					</div>
					<div className="contact-info-item">
						<LocationOnOutlined />
						<div>
							<p className="contact-info-label">Address</p>
							<p className="contact-info-value">
								123 Eco Street, San Francisco, CA
							</p>
						</div>
					</div>
				</div>

				{/* Form */}
				<div className="contact-form">
					{sent ? (
						<div className="contact-success">
							✅ Message sent! We'll get back to you within 24 hours.
						</div>
					) : (
						<>
							<div className="contact-form-field">
								<label className="contact-form-label">Your Name</label>
								<input
									className="contact-form-input"
									name="name"
									value={form.name}
									onChange={handleChange}
									placeholder="John Doe"
								/>
							</div>
							<div className="contact-form-field">
								<label className="contact-form-label">Email Address</label>
								<input
									className="contact-form-input"
									name="email"
									value={form.email}
									onChange={handleChange}
									placeholder="john@example.com"
								/>
							</div>
							<div className="contact-form-field">
								<label className="contact-form-label">Message</label>
								<textarea
									className="contact-form-textarea"
									name="message"
									value={form.message}
									onChange={handleChange}
									placeholder="How can we help you?"
									rows={5}
								/>
							</div>
							<button
								className="contact-submit-btn"
								onClick={() => setSent(true)}>
								Send Message
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

const tabs = ["FAQ", "Terms & Conditions", "Contact Us"];

export default function HelpPage() {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="help-page">
			{/* Hero */}
			<div className="help-hero">
				<Container>
					<h1 className="help-hero-title">Help & Support</h1>
					<p className="help-hero-desc">
						Get answers to your questions and reach out to us
					</p>
				</Container>
			</div>

			{/* Tabs */}
			<div className="help-content">
				<Container>
					<div className="help-tabs">
						{tabs.map((tab, i) => (
							<button
								key={i}
								className={`help-tab ${activeTab === i ? "active" : ""}`}
								onClick={() => setActiveTab(i)}>
								{tab}
							</button>
						))}
					</div>

					<div className="help-tab-content">
						{activeTab === 0 && <FaqAccordion />}
						{activeTab === 1 && <TermsContent />}
						{activeTab === 2 && <ContactContent />}
					</div>
				</Container>
			</div>
		</div>
	);
}
