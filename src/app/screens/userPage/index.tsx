import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import {
	PersonOutline,
	MailOutline,
	PhoneOutlined,
	LocationOnOutlined,
	EditOutlined,
	SaveOutlined,
	Close,
} from "@mui/icons-material";
import "../../../css/userPage.css";

const initialUser = {
	name: "John Doe",
	email: "john.doe@example.com",
	phone: "+1 (555) 123-4567",
	street: "123 Eco Street",
	city: "San Francisco",
	country: "United States",
	avatar: "/icons/user-default.svg",
	orders: 3,
	wishlist: 12,
	reviews: 5,
};

export default function UserPage() {
	const [editing, setEditing] = useState(false);
	const [user, setUser] = useState(initialUser);
	const [form, setForm] = useState(initialUser);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSave = () => {
		setUser(form);
		setEditing(false);
	};

	const handleCancel = () => {
		setForm(user);
		setEditing(false);
	};

	return (
		<div className="user-page">
			{/* Hero */}
			<div className="user-hero">
				<Container>
					<h1 className="user-hero-title">My Profile</h1>
					<p className="user-hero-desc">Manage your account information</p>
				</Container>
			</div>

			{/* Content */}
			<div className="user-content">
				<Container>
					<div className="user-layout">
						{/* Left — Avatar Card */}
						<div className="user-avatar-card">
							<img
								src={user.avatar}
								alt={user.name}
								className="user-avatar-img"
							/>
							<h2 className="user-avatar-name">{user.name}</h2>
							<p className="user-avatar-email">{user.email}</p>
							{!editing && (
								<Button
									className="user-edit-btn"
									fullWidth
									startIcon={<EditOutlined />}
									onClick={() => setEditing(true)}>
									Edit Profile
								</Button>
							)}
						</div>

						{/* Right */}
						{!editing ? (
							/* ===== VIEW MODE ===== */
							<div className="user-info-card">
								<h3 className="user-info-title">Your Information</h3>

								<div className="user-info-field">
									<div className="user-info-label">
										<PersonOutline fontSize="small" /> Full Name
									</div>
									<p className="user-info-value">{user.name}</p>
								</div>
								<div className="user-info-divider" />

								<div className="user-info-field">
									<div className="user-info-label">
										<MailOutline fontSize="small" /> Email Address
									</div>
									<p className="user-info-value">{user.email}</p>
								</div>
								<div className="user-info-divider" />

								<div className="user-info-field">
									<div className="user-info-label">
										<PhoneOutlined fontSize="small" /> Phone Number
									</div>
									<p className="user-info-value">{user.phone}</p>
								</div>
								<div className="user-info-divider" />

								<div className="user-info-field">
									<div className="user-info-label">
										<LocationOnOutlined fontSize="small" /> Address
									</div>
									<p className="user-info-value">{user.street}</p>
									<p className="user-info-value">
										{user.city}, {user.country}
									</p>
								</div>

								{/* Stats */}
								<div className="user-stats">
									<div className="user-stat-item">
										<span className="user-stat-value">{user.orders}</span>
										<span className="user-stat-label">Orders</span>
									</div>
									<div className="user-stat-item">
										<span className="user-stat-value">{user.wishlist}</span>
										<span className="user-stat-label">Wishlist</span>
									</div>
									<div className="user-stat-item">
										<span className="user-stat-value">{user.reviews}</span>
										<span className="user-stat-label">Reviews</span>
									</div>
								</div>
							</div>
						) : (
							/* ===== EDIT MODE ===== */
							<div className="user-info-card">
								<h3 className="user-info-title">Edit Your Information</h3>

								<div className="user-form">
									<div className="user-form-field">
										<label className="user-form-label">Full Name</label>
										<input
											className="user-form-input"
											name="name"
											value={form.name}
											onChange={handleChange}
										/>
									</div>
									<div className="user-form-field">
										<label className="user-form-label">Email Address</label>
										<input
											className="user-form-input"
											name="email"
											value={form.email}
											onChange={handleChange}
										/>
									</div>
									<div className="user-form-field">
										<label className="user-form-label">Phone Number</label>
										<input
											className="user-form-input"
											name="phone"
											value={form.phone}
											onChange={handleChange}
										/>
									</div>
									<div className="user-form-field">
										<label className="user-form-label">Street Address</label>
										<input
											className="user-form-input"
											name="street"
											value={form.street}
											onChange={handleChange}
										/>
									</div>
									<div className="user-form-field">
										<label className="user-form-label">City</label>
										<input
											className="user-form-input"
											name="city"
											value={form.city}
											onChange={handleChange}
										/>
									</div>
									<div className="user-form-field">
										<label className="user-form-label">Country</label>
										<input
											className="user-form-input"
											name="country"
											value={form.country}
											onChange={handleChange}
										/>
									</div>
								</div>

								<div className="user-info-divider" />

								<div className="user-form-actions">
									<Button
										className="user-save-btn"
										fullWidth
										startIcon={<SaveOutlined />}
										onClick={handleSave}>
										Save Changes
									</Button>
									<Button
										className="user-cancel-btn"
										fullWidth
										startIcon={<Close />}
										onClick={handleCancel}>
										Cancel
									</Button>
								</div>
							</div>
						)}
					</div>
				</Container>
			</div>
		</div>
	);
}
