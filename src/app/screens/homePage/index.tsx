import React, { useEffect } from "react";
import { Box, Button, Container, Stack } from "@mui/material";

import "../../../css/home.css";
import Statistics from "./Statistics";
import Services from "./Services";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProducts";
import Events from "./Events";
import { NavLink } from "react-router-dom";

export default function HomePage() {
	const authMember = false;
	return (
		<div>
			<div className="home-welcome">
				<Container>
					<Stack
						className="welcome-inner"
						flexDirection={"row"}
						alignItems={"center"}>
						<Stack className="welcome-txt" flexDirection={"column"}>
							<h1 className="welcome-title">
								Welcome to <br /> EkoPechka
							</h1>
							<p className="welcome-desc">
								Discover sustainable, eco-friendly products that make a real
								difference. From organic clothing to renewable energy solutions,
								we're committed to helping you live a more sustainable
								lifestyle.
							</p>
							<Stack
								flexDirection={"row"}
								gap={"16px"}
								className="welcome-btns">
								{!authMember ? (
									<NavLink to={"/signup"}>
										<Button className="btn-shop">SignUp</Button>
									</NavLink>
								) : (
									<>
										<NavLink to={"/products"}>
											<Button className="btn-shop">Shop Now</Button>
										</NavLink>
										<NavLink to={"/help"}>
											<Button className="btn-learn">Learn More</Button>
										</NavLink>
									</>
								)}
							</Stack>
						</Stack>

						<Box className="welcome-img-box">
							<video
								className="welcome-img"
								autoPlay={true}
								loop
								muted
								playsInline
								data-video-media="">
								<source type="video/mp4" src="/video/ads-ekopechka.mp4" />
							</video>
						</Box>
					</Stack>
				</Container>
			</div>
			<Statistics />
			<PopularProducts />
			<Services />
			<NewProducts />
			<Events />
		</div>
	);
}
