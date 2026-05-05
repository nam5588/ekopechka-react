import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Paper, BottomNavigation, BottomNavigationAction, Badge } from "@mui/material";
import {
	HomeOutlined,
	StorefrontOutlined,
	ArticleOutlined,
	HelpOutlineOutlined,
	PersonOutlineOutlined,
} from "@mui/icons-material";
import { useGlobals } from "../hooks/useGlobals";
import { CartItem } from "../../lib/types/search";

interface MobileBottomNavProps {
	cartItems: CartItem[];
}

export default function MobileBottomNav({ cartItems }: MobileBottomNavProps) {
	const history = useHistory();
	const location = useLocation();
	const { authMember } = useGlobals();

	const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	const getValue = () => {
		const path = location.pathname;
		if (path.startsWith("/products")) return "/products";
		if (path.startsWith("/articles")) return "/articles";
		if (path.startsWith("/help")) return "/help";
		if (path.startsWith("/my-page") || path.startsWith("/orders")) return "/my-page";
		return "/home";
	};

	return (
		<Paper className="mobile-bottom-nav" elevation={4}>
			<BottomNavigation
				value={getValue()}
				onChange={(_, val) => history.push(val)}
				sx={{
					height: 60,
					"& .MuiBottomNavigationAction-root": {
						minWidth: 0,
						padding: "6px 0",
						color: "#9ca3af",
						"&.Mui-selected": { color: "#6b8e6f" },
					},
					"& .MuiBottomNavigationAction-label": {
						fontSize: "0.65rem !important",
						marginTop: "2px",
					},
				}}>
				<BottomNavigationAction
					label="Home"
					value="/home"
					icon={<HomeOutlined sx={{ fontSize: "1.5rem" }} />}
				/>
				<BottomNavigationAction
					label="Products"
					value="/products"
					icon={
						<Badge badgeContent={totalCount} color="error" max={9}>
							<StorefrontOutlined sx={{ fontSize: "1.5rem" }} />
						</Badge>
					}
				/>
				<BottomNavigationAction
					label="Articles"
					value="/articles"
					icon={<ArticleOutlined sx={{ fontSize: "1.5rem" }} />}
				/>
				{authMember && (
					<BottomNavigationAction
						label="Profile"
						value="/my-page"
						icon={<PersonOutlineOutlined sx={{ fontSize: "1.5rem" }} />}
					/>
				)}
				<BottomNavigationAction
					label="Help"
					value="/help"
					icon={<HelpOutlineOutlined sx={{ fontSize: "1.5rem" }} />}
				/>
			</BottomNavigation>
		</Paper>
	);
}
