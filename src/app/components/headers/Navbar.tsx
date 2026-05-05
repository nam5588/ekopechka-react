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
	Drawer,
	IconButton,
	List,
	ListItemButton,
	Divider,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { Close, Logout, Menu as MenuIcon } from "@mui/icons-material";
import { useGlobals } from "../../hooks/useGlobals";
import { getImageUrl } from "../../../lib/config";

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
	const imagePath = getImageUrl(authMember?.memberImage);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const closeDrawer = () => setDrawerOpen(false);

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
							<img className={"brand-logo"} src="/icons/favicon.svg" alt="logo" />
						</NavLink>
					</Box>

					{/* Desktop links */}
					<Stack flexDirection={"row"} className={"links"}>
						<div className="nav-links-desktop">
							<Box className={"hover-line"}>
								<NavLink to={"/home"} activeClassName={"underline"}>Home</NavLink>
							</Box>
							<Box className={"hover-line"}>
								<NavLink to={"/products"} activeClassName={"underline"}>Products</NavLink>
							</Box>
							<Box className={"hover-line"}>
								<NavLink to={"/articles"} activeClassName={"underline"}>Articles</NavLink>
							</Box>
							{authMember && (
								<Box className={"hover-line"}>
									<NavLink to={"/orders"} activeClassName={"underline"}>Orders</NavLink>
								</Box>
							)}
							{authMember && (
								<Box className={"hover-line"}>
									<NavLink to={"/my-page"} activeClassName={"underline"}>My Page</NavLink>
								</Box>
							)}
							<Box className={"hover-line"}>
								<NavLink to={"/help"} activeClassName={"underline"}>Help</NavLink>
							</Box>
						</div>

						<Box className="navbar-divider nav-links-desktop" />

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
								className="nav-links-desktop"
								onClick={() => setLoginOpen(true)}
								sx={{ background: "#6b8e6f !important;" }}>
								LOGIN
							</Button>
						)}

						{/* Hamburger — only on mobile */}
						<IconButton
							className="hamburger-btn"
							onClick={() => setDrawerOpen(true)}
							sx={{ ml: 1 }}>
							<MenuIcon />
						</IconButton>

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
									"& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
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

			{/* Mobile Drawer */}
			<Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
				<Box className="mobile-drawer">
					<Box className="drawer-header">
						<span className="drawer-brand">EkoPechka</span>
						<IconButton onClick={closeDrawer} size="small">
							<Close />
						</IconButton>
					</Box>

					{authMember && (
						<Box className="drawer-user">
							<img
								src={imagePath}
								alt="avatar"
								className="drawer-avatar"
							/>
							<span className="drawer-username">{authMember.memberNick}</span>
						</Box>
					)}

					<List disablePadding>
						<ListItemButton component={NavLink} to="/home" sx={{ background: "#6b8e6f !important;" }} onClick={() => setLoginOpen(true)} className="drawer-nav-item">
								LOGIN
						</ListItemButton>
						<ListItemButton component={NavLink} to="/home" onClick={closeDrawer} className="drawer-nav-item">
							Home
						</ListItemButton>
						<ListItemButton component={NavLink} to="/products" onClick={closeDrawer} className="drawer-nav-item">
							Products
						</ListItemButton>
						<ListItemButton component={NavLink} to="/articles" onClick={closeDrawer} className="drawer-nav-item">
							Articles
						</ListItemButton>
						{authMember && (
							<ListItemButton component={NavLink} to="/orders" onClick={closeDrawer} className="drawer-nav-item">
								Orders
							</ListItemButton>
						)}
						{authMember && (
							<ListItemButton component={NavLink} to="/my-page" onClick={closeDrawer} className="drawer-nav-item">
								My Page
							</ListItemButton>
						)}
						<ListItemButton component={NavLink} to="/help" onClick={closeDrawer} className="drawer-nav-item">
							Help
						</ListItemButton>
					</List>

					<Divider sx={{ mt: "auto" }} />

					{!authMember ? (
						<Box sx={{ p: 2 }}>
							<Button
								fullWidth
								onClick={() => { setLoginOpen(true); closeDrawer(); }}
								sx={{ background: "#6b8e6f", color: "#fff", borderRadius: "10px", textTransform: "none", fontWeight: 600, "&:hover": { background: "#5a7a5e" } }}>
								Login
							</Button>
						</Box>
					) : (
						<Box sx={{ p: 2 }}>
							<Button
								fullWidth
								onClick={() => { handleLogoutRequest(); closeDrawer(); }}
								variant="outlined"
								sx={{ borderColor: "#e5e5e5", color: "#555", borderRadius: "10px", textTransform: "none", fontWeight: 600 }}>
								Logout
							</Button>
						</Box>
					)}
				</Box>
			</Drawer>
		</div>
	);
}
