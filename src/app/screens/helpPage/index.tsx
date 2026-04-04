import React, { useState } from "react";
import { Container } from "@mui/material";
import {
	ExpandMore,
	ExpandLess,
	MailOutline,
	PhoneOutlined,
	LocationOnOutlined,
	CheckCircleOutline,
	ErrorOutline,
} from "@mui/icons-material";
import "../../../css/help.css";
import axios from "axios";
import { serverApi } from "../../../lib/config";

const faqs = [
	{
		q: "What does EkoPechka mean?",
		a: "EkoPechka combines 'Eco' (ecological) and 'Pechka' (stove in Uzbek), symbolizing warmth and sustainability. We are committed to providing eco-friendly products that warm both your home and the planet.",
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

const tabs = ["FAQ", "Terms & Conditions", "Contact Us"];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FaqAccordion() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<div className="help-faq">
			<h2 className="help-section-title">Frequently Asked Questions</h2>
			<div className="faq-list">
				{faqs.map((faq, i) => (
					<div
						key={i}
						className={`faq-item ${openIndex === i ? "open" : ""}`}
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

// ─── TERMS ───────────────────────────────────────────────────────────────────

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

// ─── CONTACT ─────────────────────────────────────────────────────────────────

type FormStatus = "idle" | "loading" | "success" | "error";

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

function ContactContent() {
	const [form, setForm] = useState(EMPTY_FORM);
	const [errors, setErrors] = useState<Partial<typeof EMPTY_FORM>>({});
	const [status, setStatus] = useState<FormStatus>("idle");

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof typeof errors]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validate = (): boolean => {
		const newErrors: Partial<typeof EMPTY_FORM> = {};
		if (!form.name.trim()) newErrors.name = "* Name is required";
		if (!form.email.trim()) newErrors.email = "* Email is required";
		if (!form.subject.trim()) newErrors.subject = "* Subject is required";
		if (!form.message.trim()) newErrors.message = "* Message is required";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validate()) return;
		setStatus("loading");
		try {
			await axios.post(`${serverApi}/contact`, form);
			setStatus("success");
			setForm(EMPTY_FORM);
		} catch (err) {
			console.log("Error:", err);
			setStatus("error");
		}
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
							<p className="contact-info-value">mukhammad5589@gmail.com</p>
						</div>
					</div>
					<div className="contact-info-item">
						<PhoneOutlined />
						<div>
							<p className="contact-info-label">Phone</p>
							<p className="contact-info-value">+998 (93) 491-7500</p>
							<p className="contact-info-value">+998 (93) 491-7501</p>
						</div>
					</div>
					<div className="contact-info-item">
						<LocationOnOutlined />
						<div>
							<p className="contact-info-label">Address</p>
							<p className="contact-info-value">
								Yakkabog' Street, Namangan, Xasanobod, Uzbekistan
							</p>
						</div>
					</div>
				</div>

				{/* Form */}
				<div className="contact-form">
					{status === "success" && (
						<div className="contact-status success">
							<CheckCircleOutline />
							Message sent! We'll get back to you within 24 hours.
						</div>
					)}
					{status === "error" && (
						<div className="contact-status error">
							<ErrorOutline />
							Something went wrong. Please try again.
						</div>
					)}

					<div className="contact-form-row">
						<div className="contact-form-field">
							<label className="contact-form-label">Your Name</label>
							<input
								className={`contact-form-input ${errors.name ? "input-error" : ""}`}
								name="name"
								value={form.name}
								onChange={handleChange}
								placeholder="Adam Omar"
							/>
							{errors.name && (
								<span className="input-error-msg">{errors.name}</span>
							)}
						</div>
						<div className="contact-form-field">
							<label className="contact-form-label">
								Email Address or Telegram Username
							</label>
							<input
								className={`contact-form-input ${errors.email ? "input-error" : ""}`}
								name="email"
								type="email"
								value={form.email}
								onChange={handleChange}
								placeholder="youremail@example.com"
							/>
							{errors.email && (
								<span className="input-error-msg">{errors.email}</span>
							)}
						</div>
					</div>

					<div className="contact-form-field">
						<label className="contact-form-label">Subject</label>
						<input
							className={`contact-form-input ${errors.subject ? "input-error" : ""}`}
							name="subject"
							value={form.subject}
							onChange={handleChange}
							placeholder="How can we help?"
						/>
						{errors.subject && (
							<span className="input-error-msg">{errors.subject}</span>
						)}
					</div>

					<div className="contact-form-field">
						<label className="contact-form-label">Message</label>
						<textarea
							className={`contact-form-textarea ${errors.message ? "input-error" : ""}`}
							name="message"
							value={form.message}
							onChange={handleChange}
							placeholder="Write your message here..."
							rows={5}
						/>
						{errors.message && (
							<span className="input-error-msg">{errors.message}</span>
						)}
					</div>

					<button
						className="contact-submit-btn"
						onClick={handleSubmit}
						disabled={status === "loading"}>
						{status === "loading" ? "Sending..." : "Send Message"}
					</button>
				</div>
			</div>

			{/* Map */}
			<div className="contact-map-wrap">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7607.282610915089!2d71.70892396061565!3d41.04674643533193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4d0029c89297%3A0x3bf96a2caff437b!2sEKOPECHKA%20NAMANGAN!5e1!3m2!1sen!2skr!4v1775312309799!5m2!1sen!2skr"
					width="800px"
					title="EkoPechka Location"
					height="420"
					style={{ border: 0, borderRadius: "12px" }}
					allowFullScreen
					loading="lazy"
					referrerPolicy="no-referrer"
				/>
			</div>
		</div>
	);
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

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

			{/* Content */}
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
