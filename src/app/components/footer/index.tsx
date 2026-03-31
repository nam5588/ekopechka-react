import React from "react";
import { Instagram, Mail, Phone, Telegram, YouTube } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.footer`
	position: absolute;
	bottom: 0px;
	width: 100%;
	background: #343434;
`;

const FooterContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 48px 24px;
`;

const FooterGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 32px;
	margin-bottom: 40px;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

const BrandLogo = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 14px;
`;

const LogoIcon = styled.div`
	width: 40px;
	height: 40px;
	background: linear-gradient(135deg, #6b8e6f, #c97c5c);
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;

	img {
		width: 26px;
		height: 26px;
		object-fit: contain;
	}
`;

const BrandName = styled.span`
	font-family: "Playfair Display", serif;
	font-weight: 700;
	font-size: 1.125rem;
	color: #fff;
`;

const BrandDesc = styled.p`
	color: #9ca3af;
	font-size: 0.875rem;
	line-height: 1.6;
	margin: 0;
`;

const ColTitle = styled.h3`
	font-family: "Playfair Display", serif;
	font-weight: 700;
	font-size: 1rem;
	color: #fff;
	margin: 0 0 16px 0;
`;

const LinkList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 10px;

	li a {
		color: #9ca3af;
		text-decoration: none;
		font-size: 0.875rem;
		transition: color 0.2s ease;

		&:hover,
		&.active {
			color: #6b8e6f;
		}
	}
`;

const ContactList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const ContactItem = styled.li`
	display: flex;
	align-items: flex-start;
	gap: 8px;

	svg {
		color: #6b8e6f;
		font-size: 1.1rem !important;
		flex-shrink: 0;
		margin-top: 2px;
	}

	span {
		color: #9ca3af;
		font-size: 0.875rem;
	}
`;

const Divider = styled.div`
	border-top: 1px solid #4b5563;
`;

const SocialRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 16px;
	padding: 28px 0;

	p {
		color: #9ca3af;
		font-size: 0.875rem;
		margin: 0;
	}
`;

const SocialIcons = styled.div`
	display: flex;
	gap: 16px;

	a {
		color: #9ca3af;
		display: flex;
		transition: color 0.2s ease;

		svg {
			font-size: 1.2rem !important;
		}

		&:hover {
			color: #6b8e6f;
		}
	}
`;

const Copyright = styled.div`
	padding-top: 24px;
	text-align: center;

	p {
		color: #9ca3af;
		font-size: 0.875rem;
		margin: 0;
	}
`;

export default function Footer() {
	const authMember = false;

	return (
		<Footers>
			<FooterContainer>
				<FooterGrid>
					{/* Brand */}
					<div>
						<BrandLogo>
							<LogoIcon>
								<img src="/icons/favicon.svg" alt="logo" />
							</LogoIcon>
							<BrandName>EkoPechka</BrandName>
						</BrandLogo>
						<BrandDesc>
							Sustainable products for a better tomorrow. Shop eco-friendly
							items that make a difference.
						</BrandDesc>
					</div>

					{/* Quick Links */}
					<div>
						<ColTitle>Quick Links</ColTitle>
						<LinkList>
							<li>
								<NavLink to="/products">Products</NavLink>
							</li>
							<li>
								<NavLink to="/articles">Articles</NavLink>
							</li>
							{authMember && (
								<li>
									<NavLink to="/orders">Orders</NavLink>
								</li>
							)}
							{authMember && (
								<li>
									<NavLink to="/my-page">My Page</NavLink>
								</li>
							)}
							<li>
								<NavLink to="/help">Help</NavLink>
							</li>
						</LinkList>
					</div>

					{/* Contact */}
					<div>
						<ColTitle>Contact Us</ColTitle>
						<ContactList>
							<ContactItem>
								<Mail />
								<span>mukhammad5589@gmail.com</span>
							</ContactItem>
							<ContactItem>
								<Phone />
								<span>+998 (93) 491-7500</span>
							</ContactItem>
							<ContactItem>
								<Phone />
								<span>+998 (93) 491-7501</span>
							</ContactItem>
						</ContactList>
					</div>
				</FooterGrid>

				<Divider>
					<SocialRow>
						<p>Follow us on social media</p>
						<SocialIcons>
							<a href="#">
								<Telegram />
							</a>
							<a href="#">
								<YouTube />
							</a>
							<a href="#">
								<Instagram />
							</a>
						</SocialIcons>
					</SocialRow>
				</Divider>

				<Divider>
					<Copyright>
						<p>
							© {2026} EkoPechka. All rights reserved. | Made with ♻️ for a
							sustainable future.
						</p>
					</Copyright>
				</Divider>
			</FooterContainer>
		</Footers>
	);
}
