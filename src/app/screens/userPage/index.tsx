import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import {
	PersonOutline,
	PhoneOutlined,
	LocationOnOutlined,
	EditOutlined,
	SaveOutlined,
	Close,
} from "@mui/icons-material";
import ContactsIcon from "@mui/icons-material/Contacts";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import "../../../css/userPage.css";
import { useGlobals } from "../../hooks/useGlobals";
import {
	sweetErrorHandling,
	sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Messages, getImageUrl } from "../../../lib/config";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import MemberService from "../../services/MemberService";
import { useHistory } from "react-router-dom";

export default function UserPage() {
	const { authMember, setAuthMember } = useGlobals();
	const history = useHistory();

	const [editing, setEditing] = useState(false);
	const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
		{
			memberNick: authMember?.memberNick,
			memberPhone: authMember?.memberPhone,
			memberAddress: authMember?.memberAddress,
			memberDesc: authMember?.memberDesc,
			memberImage: authMember?.memberImage,
		},
	);

	const [previewImage, setPreviewImage] = useState<string>(
		getImageUrl(authMember?.memberImage),
	);

	/** HANDLERS **/
	const handleImageViewer = (e: T) => {
		const file = e.target.files[0];
		const fileTypes = file.type;
		const validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];

		if (!validateImageTypes.includes(fileTypes)) {
			sweetErrorHandling(Messages.error5).then();
		} else {
			setMemberUpdateInput((prev) => ({ ...prev, memberImage: file }));
			setPreviewImage(URL.createObjectURL(file));
		}
	};

	const memberNickHandler = (e: T) => {
		setMemberUpdateInput((prev) => ({ ...prev, memberNick: e.target.value }));
	};

	const memberPhoneHandler = (e: T) => {
		setMemberUpdateInput((prev) => ({ ...prev, memberPhone: e.target.value }));
	};

	const memberAddressHandler = (e: T) => {
		setMemberUpdateInput((prev) => ({
			...prev,
			memberAddress: e.target.value,
		}));
	};

	const memberDescHandler = (e: T) => {
		setMemberUpdateInput((prev) => ({ ...prev, memberDesc: e.target.value }));
	};

	const handleSave = async () => {
		try {
			if (!authMember) throw new Error(Messages.error2);
			if (
				memberUpdateInput.memberNick === "" ||
				memberUpdateInput.memberPhone === "" ||
				memberUpdateInput.memberAddress === "" ||
				memberUpdateInput.memberDesc === ""
			) {
				throw new Error(Messages.error3);
			}

			const member = new MemberService();
			console.log("test===:", memberUpdateInput);

			const result = await member.updateMember(memberUpdateInput);
			setAuthMember(result);
			await sweetTopSmallSuccessAlert("Modified successfully", 700);
			setEditing(false);
		} catch (err) {
			console.log(err);
			sweetErrorHandling(err).then();
		}
	};

	const handleCancel = () => {
		setMemberUpdateInput({
			memberNick: authMember?.memberNick,
			memberPhone: authMember?.memberPhone,
			memberAddress: authMember?.memberAddress,
			memberDesc: authMember?.memberDesc,
			memberImage: authMember?.memberImage,
		});
		setPreviewImage(getImageUrl(authMember?.memberImage));
		setEditing(false);
	};
	if (!authMember) history.push("/");

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
								src={previewImage}
								alt={authMember?.memberNick}
								className="user-avatar-img"
							/>
							<h2 className="user-avatar-name">{authMember?.memberNick}</h2>
							<p className="user-avatar-email">
								{authMember?.memberDesc ?? "No user description"}
							</p>
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
									<p className="user-info-value">{authMember?.memberNick}</p>
								</div>
								<div className="user-info-divider" />

								<div className="user-info-field">
									<div className="user-info-label">
										<PhoneOutlined fontSize="small" /> Phone Number
									</div>
									<p className="user-info-value">{authMember?.memberPhone}</p>
								</div>
								<div className="user-info-divider" />

								<div className="user-info-field">
									<div className="user-info-label">
										<ContactsIcon fontSize="small" /> Description
									</div>
									<p className="user-info-value">
										{authMember?.memberDesc ?? "No user description"}
									</p>
								</div>
								<div className="user-info-divider" />

								<div className="user-info-field">
									<div className="user-info-label">
										<LocationOnOutlined fontSize="small" /> Address
									</div>
									<p className="user-info-value">
										{authMember?.memberAddress ?? "No user address"}
									</p>
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
											value={memberUpdateInput.memberNick ?? ""}
											onChange={memberNickHandler}
										/>
									</div>

									<div className="user-form-field">
										<label className="user-form-label">Description</label>
										<input
											className="user-form-input"
											value={memberUpdateInput.memberDesc ?? ""}
											onChange={memberDescHandler}
										/>
									</div>

									<div className="user-form-field">
										<label className="user-form-label">Phone Number</label>
										<input
											className="user-form-input"
											value={memberUpdateInput.memberPhone ?? ""}
											onChange={memberPhoneHandler}
										/>
									</div>

									<div className="user-form-field">
										<label className="user-form-label">Address</label>
										<input
											className="user-form-input"
											value={memberUpdateInput.memberAddress ?? ""}
											onChange={memberAddressHandler}
										/>
									</div>

									<div className="user-form-field">
										<label className="user-form-label">Upload Image</label>
										<input
											className="user-form-input"
											value="JPG, JPEG, PNG formats only!"
											disabled
										/>
										<div className="up-del-box">
											<Button className="btn" component="label">
												<CloudDownloadIcon />
												<input
													type="file"
													hidden
													onChange={handleImageViewer}
												/>
											</Button>
										</div>
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
