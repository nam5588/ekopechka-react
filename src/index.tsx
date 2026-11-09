import React from "react";
import { createRoot } from "react-dom/client"; // VARTUAL AND REAL
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./app/MaterialTheme";
import { BrowserRouter as Router } from "react-router-dom";
import ContextProvider from "./app/context/ContextProvider";
import { SocketProvider } from "./app/context/SocketContext";
import { LanguageProvider } from "./app/i18n/LanguageContext";
import "./css/index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<LanguageProvider>
			<ContextProvider>
				<SocketProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Router>
						<App />
					</Router>
				</ThemeProvider>
				</SocketProvider>
			</ContextProvider>
			</LanguageProvider>
		</Provider>
	</React.StrictMode>,
);

reportWebVitals();
