import React, { useState, useEffect, useRef } from "react";
import {
	Dialog,
	DialogContent,
	Stack,
	TextField,
	Button,
	Typography,
	Box,
	IconButton,
	InputAdornment,
	Divider,
} from "@mui/material";
import {
	Login as LoginIcon,
	PersonAddAlt1 as SignupIcon,
	Close as CloseIcon,
	Visibility,
	VisibilityOff,
} from "@mui/icons-material";
import { T } from "../../../lib/types/common";
import { Messages, serverApi } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import axios from "axios";

interface AuthenticationModalProps {
	signupOpen: boolean;
	loginOpen: boolean;
	handleSignupClose: () => void;
	handleLoginClose: () => void;
}

export default function AuthenticationModal({
	signupOpen,
	loginOpen,
	handleSignupClose,
	handleLoginClose,
}: AuthenticationModalProps) {
	const [memberNick, setMemberNick] = useState<string>("");
	const [memberPhone, setMemberPhone] = useState<string>("");
	const [memberPassword, setMemberPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { setAuthMember } = useGlobals();
	const tgBtnRef = useRef<HTMLDivElement>(null);

	const isSignup = signupOpen;
	const isOpen = signupOpen || loginOpen;
	const handleClose = isSignup ? handleSignupClose : handleLoginClose;

	useEffect(() => {
		if (!isOpen) return;

		(window as T).onTelegramAuth = async (user: T) => {
			try {
				const res = await axios.post(
					`${serverApi}/member/telegram-login`,
					user,
					{ withCredentials: true },
				);
				const { member, accessToken } = res.data;
				localStorage.setItem("memberData", JSON.stringify(member));
				localStorage.setItem("accessToken", accessToken);
				setAuthMember(member);
				handleClose();
			} catch (err) {
				sweetErrorHandling(err).then();
			}
		};

		const timer = setTimeout(() => {
			const container = tgBtnRef.current;
			if (!container) return;
			container.innerHTML = "";
			const script = document.createElement("script");
			script.src = "https://telegram.org/js/telegram-widget.js?22";
			script.setAttribute("data-telegram-login", "EkoPechkabot");
			script.setAttribute("data-size", "large");
			script.setAttribute("data-onauth", "onTelegramAuth(user)");
			script.setAttribute("data-request-access", "write");
			script.async = true;
			container.appendChild(script);
		}, 300);

		const containerRef = tgBtnRef.current;
		return () => {
			clearTimeout(timer);
			if (containerRef) containerRef.innerHTML = "";
			delete (window as T).onTelegramAuth;
		};
	}, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

	/** HANDLERS **/
	const handlePasswordKeyDown = (e: T) => {
		if (e.key === "Enter") {
			isSignup ? handleSignupRequest() : handleLoginRequest();
		}
	};

	const handleSignupRequest = async () => {
		try {
			const isFulfilled =
				memberNick !== "" && memberPhone !== "" && memberPassword !== "";
			if (!isFulfilled) throw new Error(Messages.error3);

			const signupInput: MemberInput = {
				memberNick,
				memberPhone,
				memberPassword,
			};
			const member = new MemberService();
			const result = await member.signup(signupInput);

			setAuthMember(result);
			handleSignupClose();
		} catch (err) {
			handleSignupClose();
			sweetErrorHandling(err).then();
		}
	};

	const handleLoginRequest = async () => {
		try {
			const isFulfilled = memberNick !== "" && memberPassword !== "";
			if (!isFulfilled) throw new Error(Messages.error3);

			const loginInput: LoginInput = { memberNick, memberPassword };
			const member = new MemberService();
			const result = await member.login(loginInput);

			setAuthMember(result);
			handleLoginClose();
		} catch (err) {
			handleLoginClose();
			sweetErrorHandling(err).then();
		}
	};

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			maxWidth="md"
			PaperProps={{
				sx: {
					borderRadius: "20px",
					overflow: "hidden",
					width: "780px",
					maxHeight: "520px",
				},
			}}>
			<DialogContent sx={{ p: 0, display: "flex", height: "100%" }}>
				{/* Left — Image Panel */}
				<Box
					sx={{
						width: "42%",
						minHeight: "500px",
						position: "relative",
						flexShrink: 0,
						backgroundImage: `url('/img/authImg.png')`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}>
					<Box
						sx={{
							position: "absolute",
							inset: 0,
							background:
								"linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)",
							display: "flex",
							flexDirection: "column",
							justifyContent: "flex-end",
							p: 3.5,
						}}>
						<Typography
							sx={{
								color: "#fff",
								fontSize: "26px",
								fontWeight: 700,
								lineHeight: 1.2,
								letterSpacing: "-0.5px",
							}}>
							{isSignup ? "Create your\naccount" : "Welcome\nback"}
						</Typography>
						<Typography
							sx={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", mt: 1 }}>
							{isSignup
								? "Join us and enjoy all features"
								: "Sign in to continue your journey"}
						</Typography>
					</Box>
				</Box>

				{/* Right — Form Panel */}
				<Stack
					sx={{
						flex: 1,
						p: "36px 40px",
						justifyContent: "center",
						position: "relative",
						backgroundColor: "#fff",
					}}>
					{/* Close Button */}
					<IconButton
						onClick={handleClose}
						size="small"
						sx={{
							position: "absolute",
							top: 16,
							right: 16,
							color: "text.secondary",
						}}>
						<CloseIcon fontSize="small" />
					</IconButton>
					{/* Title */}
					<Typography
						sx={{
							fontSize: "22px",
							fontWeight: 700,
							color: "#111",
							mb: 0.5,
							letterSpacing: "-0.3px",
						}}>
						{isSignup ? "Sign Up" : "Sign In"}
					</Typography>
					<Typography sx={{ fontSize: "13px", color: "text.secondary", mb: 3 }}>
						{isSignup
							? "Fill in the form to create your account"
							: "Enter your credentials to access your account"}
					</Typography>
					{/* Fields */}
					<Stack gap={2}>
						<TextField
							label="Username"
							variant="outlined"
							size="small"
							fullWidth
							onChange={(e) => setMemberNick(e.target.value)}
							sx={fieldSx}
						/>

						{isSignup && (
							<TextField
								label="Phone Number"
								variant="outlined"
								size="small"
								fullWidth
								onChange={(e) => setMemberPhone(e.target.value)}
								sx={fieldSx}
							/>
						)}

						<TextField
							label="Password"
							variant="outlined"
							size="small"
							fullWidth
							type={showPassword ? "text" : "password"}
							onChange={(e) => setMemberPassword(e.target.value)}
							onKeyDown={handlePasswordKeyDown}
							sx={fieldSx}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											size="small"
											onClick={() => setShowPassword((v) => !v)}
											edge="end">
											{showPassword ? (
												<VisibilityOff fontSize="small" />
											) : (
												<Visibility fontSize="small" />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Stack>
					{/* Submit */}
					<Button
						fullWidth
						variant="contained"
						size="large"
						startIcon={isSignup ? <SignupIcon /> : <LoginIcon />}
						onClick={isSignup ? handleSignupRequest : handleLoginRequest}
						sx={{
							mt: 3,
							borderRadius: "10px",
							textTransform: "none",
							fontWeight: 600,
							fontSize: "15px",
							py: 1.3,
							backgroundColor: "#111",
							"&:hover": { backgroundColor: "#333" },
						}}>
						{isSignup ? "Create Account" : "Sign In"}
					</Button>
					<Divider sx={{ my: 2, fontSize: "12px", color: "text.secondary" }}>
						or continue with
					</Divider>
					Soon
					{/* <Box ref={tgBtnRef} sx={{ display: "flex", justifyContent: "center" }} /> */}
				</Stack>
			</DialogContent>
		</Dialog>
	);
}

const fieldSx = {
	"& .MuiOutlinedInput-root": {
		borderRadius: "10px",
		fontSize: "14px",
	},
	"& .MuiInputLabel-root": {
		fontSize: "14px",
	},
};
