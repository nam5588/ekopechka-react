import React, { useState } from "react";
import "../../../css/modal.css";

import {
	Stack,
	Container,
	Box,
	Button,
	MenuItem,
	ListItemIcon,
	Menu,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { Logout } from "@mui/icons-material";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

interface NavbarProps {
	cartItems: CartItem[];
	onAdd: (item: CartItem) => void;
	onRemove: (item: CartItem) => void;
	onDelete: (item: CartItem) => void;
	onDeleteAll: () => void;
	setLoginOpen: (isOpen: boolean) => void;
	handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
	handleLogoutClose: (e: React.MouseEvent<HTMLElement>) => void;
	handleLogoutRequest: () => void;
	anchorEl: HTMLElement | null;
}

export default function Navbar(props: NavbarProps) {
	const {
		cartItems,
		onAdd,
		onRemove,
		onDelete,
		onDeleteAll,
		setLoginOpen,
		handleLogoutClick,
		handleLogoutClose,
		handleLogoutRequest,
		anchorEl,
	} = props;
	const { authMember } = useGlobals();
	const imagePath = authMember?.memberImage
		? `${serverApi}/${authMember.memberImage}`
		: "/icons/user-default.svg";
	return (
		<div className="navbar">
			<Container className="navbar-container">
				<Stack
					flexDirection={"row"}
					alignItems={"center"}
					justifyContent={"space-between"}
					className="navbar-menu">
					<Box className="image-box">
						<NavLink to={"/home"}>
							<img
								className={"brand-logo"}
								src="/icons/favicon.svg"
								alt="logo"
							/>
						</NavLink>
					</Box>
					<Stack flexDirection={"row"} className={"links"}>
						<Box className={"hover-line"}>
							<NavLink to={"/home"} activeClassName={"underline"}>
								Home
							</NavLink>
						</Box>
						<Box className={"hover-line"}>
							<NavLink to={"/products"} activeClassName={"underline"}>
								Products
							</NavLink>
						</Box>
						<Box className={"hover-line"}>
							<NavLink to={"/articles"} activeClassName={"underline"}>
								Articles
							</NavLink>
						</Box>

						{authMember ? (
							<Box className={"hover-line"}>
								<NavLink to={"/orders"} activeClassName={"underline"}>
									Orders
								</NavLink>
							</Box>
						) : null}

						{authMember ? (
							<Box className={"hover-line"}>
								<NavLink to={"/my-page"} activeClassName={"underline"}>
									My Page
								</NavLink>
							</Box>
						) : null}
						<Box className={"hover-line"}>
							<NavLink to={"/help"} activeClassName={"underline"}>
								Help
							</NavLink>
						</Box>
						<Basket
							onAdd={onAdd}
							cartItems={cartItems}
							onRemove={onRemove}
							onDeleteAll={onDeleteAll}
							onDelete={onDelete}
						/>
						{authMember ? (
							<Box sx={{ borderRadius: "50%" }}>
								<img
									className="user-avatar"
									src={imagePath}
									aria-haspopup={"true"}
									alt=""
									onClick={handleLogoutClick}
									style={{ borderRadius: "50%" }}
								/>
							</Box>
						) : (
							<Button
								onClick={() => setLoginOpen(true)}
								sx={{ background: "#6b8e6f !important;" }}>
								LOGIN
							</Button>
						)}
						<Menu
							anchorEl={anchorEl}
							id="account-menu"
							open={Boolean(anchorEl)}
							onClose={handleLogoutClose}
							onClick={handleLogoutClose}
							PaperProps={{
								elevation: 0,
								sx: {
									overflow: "visible",
									filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
									mt: 1.5,
									"& .MuiAvatar-root": {
										width: 32,
										height: 32,
										ml: -0.5,
										mr: 1,
									},
									"&:before": {
										content: '""',
										display: "block",
										position: "absolute",
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: "background.paper",
										transform: "translateY(-50%) rotate(45deg)",
										zIndex: 0,
									},
								},
							}}
							transformOrigin={{ horizontal: "right", vertical: "top" }}
							anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
							<MenuItem onClick={handleLogoutRequest}>
								<ListItemIcon>
									<Logout fontSize="small" style={{ color: "blue" }} />
								</ListItemIcon>
								Logout
							</MenuItem>
						</Menu>
					</Stack>
				</Stack>
			</Container>
		</div>
	);
}
