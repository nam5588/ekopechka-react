import React from "react";
import Basket from "./Basket";

import { Stack, Container, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Navbar() {
	const authMember = true;

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
						<Box className={"hover-line"}>
							<img
								className="basket-btn"
								src="/icons/basket.svg"
								alt="basket"
							/>
						</Box>
						<Basket />
						{authMember ? (
							<Box sx={{ borderRadius: "50%" }}>
								<img
									className="user-avatar"
									src="/icons/user-default.svg"
									aria-haspopup={"true"}
									alt=""
									style={{ borderRadius: "50%" }}
								/>
							</Box>
						) : (
							<Button>LOGIN</Button>
						)}
					</Stack>
				</Stack>
			</Container>
		</div>
	);
}
