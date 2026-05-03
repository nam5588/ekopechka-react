import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom"; // hook useHistory
import { CartItem } from "../../../lib/types/search";
import { getImageUrl } from "../../../lib/config";
import { Messages, getImageUrl } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

interface BasketProps {
	cartItems: CartItem[];
	onAdd: (item: CartItem) => void;
	onRemove: (item: CartItem) => void;
	onDelete: (item: CartItem) => void;
	onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
	const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;

	const { authMember, setOrderBuilder } = useGlobals();
	const history = useHistory();
	const itemsPrice = cartItems.reduce(
		(a: number, c: CartItem) => a + c.quantity * c.price,
		0,
	);
	const shippingCoast: number = itemsPrice < 100 ? 5 : 0;
	const totalPrice = (itemsPrice + shippingCoast).toFixed(1);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	/** HANDLERS **/
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const proceedOrderHandler = async () => {
		try {
			handleClose();
			if (!authMember) throw new Error(Messages.error2);

			const order = new OrderService();
			await order.createOrder(cartItems);

			onDeleteAll();

			setOrderBuilder(new Date());

			history.push("/orders");
		} catch (err) {
			console.log(err);
			sweetErrorHandling(err).then();
		}
	};

	return (
		<Box className={"hover-line"}>
			<IconButton
				aria-label="cart"
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}>
				<Badge badgeContent={cartItems.length} color="success">
					<img className="basket-btn" src="/icons/basket.svg" alt="basket" />
				</Badge>
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
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
				<Stack className={"basket-frame"}>
					<Box className={"all-check-box"}>
						{cartItems.length === 0 ? (
							<div>Cart is empty!</div>
						) : (
							<Stack flexDirection={"row"}>
								<div>Cart Products:</div>
								<DeleteForeverIcon
									sx={{ ml: "5px", cursor: "pointer" }}
									onClick={() => onDeleteAll()}
								/>
							</Stack>
						)}
					</Box>

					<Box className={"orders-main-wrapper"}>
						<Box className={"orders-wrapper"}>
							{cartItems.map((item: CartItem) => {
								return (
									<Box className={"basket-info-box"} key={item._id}>
										<div className={"cancel-btn"}>
											<CancelIcon
												color={"primary"}
												onClick={() => onDelete(item)}
											/>
										</div>
										<img
											alt=""
											src={getImageUrl(item.image)}
											className={"product-img"}
										/>
										<span className={"product-name"}>{item.name}</span>
										<p className={"product-price"}>
											${item.price} x {item.quantity}
										</p>
										<Box sx={{ minWidth: 120 }}>
											<div className="col-2">
												<button
													onClick={() => onRemove(item)}
													className="remove">
													-
												</button>{" "}
												<button onClick={() => onAdd(item)} className="add">
													+
												</button>
											</div>
										</Box>
									</Box>
								);
							})}
						</Box>
					</Box>
					{cartItems.length !== 0 ? (
						<Box className={"basket-order"}>
							<Stack flexDirection={"column"}>
								<span className={"price"}>
									Total: ${totalPrice} ({itemsPrice} + {shippingCoast})
								</span>
								<span
									style={{
										color: "green",
										fontWeight: "bolder",
										fontSize: "14px",
									}}>
									{shippingCoast === 0
										? "Free 🚚"
										: `Spend $${100 - itemsPrice} for free delivery`}
								</span>
							</Stack>
							<Button
								onClick={proceedOrderHandler}
								startIcon={<ShoppingCartIcon />}
								variant={"contained"}>
								Order
							</Button>
						</Box>
					) : (
						""
					)}
				</Stack>
			</Menu>
		</Box>
	);
}
