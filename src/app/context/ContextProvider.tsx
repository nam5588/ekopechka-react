import React, { ReactNode, useEffect, useState } from "react";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";
import {
	getStoredMember,
	setupAuthInterceptors,
	setUnauthorizedHandler,
} from "../../lib/authSession";

// Install axios auth interceptors once, before any component sends a request
setupAuthInterceptors();

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	// Only restore the member if the stored token has not expired
	const [authMember, setAuthMember] = useState<Member | null>(() => getStoredMember());
	const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

	// Server said 401 → session is gone, show the user as logged out
	useEffect(() => {
		setUnauthorizedHandler(() => setAuthMember(null));
	}, []);

	return (
		<GlobalContext.Provider
			value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}>
			{children}
		</GlobalContext.Provider>
	);
};

export default ContextProvider;
