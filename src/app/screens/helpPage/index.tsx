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
import { useTranslation } from "../../i18n/LanguageContext";

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FaqAccordion() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const { t } = useTranslation();

	return (
		<div className="help-faq">
			<h2 className="help-section-title">{t.help.faqTitle}</h2>
			<div className="faq-list">
				{t.help.faqs.map((faq, i) => (
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
	const { t } = useTranslation();
	return (
		<div className="help-terms">
			<h2 className="help-section-title">{t.help.termsTitle}</h2>
			<p className="help-terms-intro">{t.help.termsIntro}</p>
			<div className="terms-list">
				{t.help.terms.map((item, i) => (
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
	const { t } = useTranslation();

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
		if (!form.name.trim()) newErrors.name = t.help.errors.name;
		if (!form.email.trim()) newErrors.email = t.help.errors.email;
		if (!form.subject.trim()) newErrors.subject = t.help.errors.subject;
		if (!form.message.trim()) newErrors.message = t.help.errors.message;
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
			<h2 className="help-section-title">{t.help.contactTitle}</h2>
			<div className="contact-layout">
				{/* Info */}
				<div className="contact-info">
					<div className="contact-info-item">
						<MailOutline />
						<div>
							<p className="contact-info-label">{t.help.email}</p>
							<p className="contact-info-value">mukhammad5589@gmail.com</p>
						</div>
					</div>
					<div className="contact-info-item">
						<PhoneOutlined />
						<div>
							<p className="contact-info-label">{t.help.phone}</p>
							<p className="contact-info-value"><bdi>+998 (93) 491-7500</bdi></p>
							<p className="contact-info-value"><bdi>+998 (93) 491-7501</bdi></p>
						</div>
					</div>
					<div className="contact-info-item">
						<LocationOnOutlined />
						<div>
							<p className="contact-info-label">{t.help.address}</p>
							<p className="contact-info-value">{t.help.addressValue}</p>
						</div>
					</div>
				</div>

				{/* Form */}
				<div className="contact-form">
					{status === "success" && (
						<div className="contact-status success">
							<CheckCircleOutline />
							{t.help.sent}
						</div>
					)}
					{status === "error" && (
						<div className="contact-status error">
							<ErrorOutline />
							{t.help.error}
						</div>
					)}

					<div className="contact-form-row">
						<div className="contact-form-field">
							<label className="contact-form-label">{t.help.yourName}</label>
							<input
								className={`contact-form-input ${errors.name ? "input-error" : ""}`}
								name="name"
								value={form.name}
								onChange={handleChange}
								placeholder={t.help.namePh}
							/>
							{errors.name && (
								<span className="input-error-msg">{errors.name}</span>
							)}
						</div>
						<div className="contact-form-field">
							<label className="contact-form-label">
								{t.help.emailLabel}
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
						<label className="contact-form-label">{t.help.subject}</label>
						<input
							className={`contact-form-input ${errors.subject ? "input-error" : ""}`}
							name="subject"
							value={form.subject}
							onChange={handleChange}
							placeholder={t.help.subjectPh}
						/>
						{errors.subject && (
							<span className="input-error-msg">{errors.subject}</span>
						)}
					</div>

					<div className="contact-form-field">
						<label className="contact-form-label">{t.help.message}</label>
						<textarea
							className={`contact-form-textarea ${errors.message ? "input-error" : ""}`}
							name="message"
							value={form.message}
							onChange={handleChange}
							placeholder={t.help.messagePh}
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
						{status === "loading" ? t.help.sending : t.help.send}
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
	const { t } = useTranslation();

	return (
		<div className="help-page">
			{/* Hero */}
			<div className="help-hero">
				<Container>
					<h1 className="help-hero-title">{t.help.heroTitle}</h1>
					<p className="help-hero-desc">{t.help.heroDesc}</p>
				</Container>
			</div>

			{/* Content */}
			<div className="help-content">
				<Container>
					<div className="help-tabs">
						{t.help.tabs.map((tab, i) => (
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
