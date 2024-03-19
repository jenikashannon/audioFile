import "./App.scss";

// pages
import CratesPage from "./pages/CratesPage/CratesPage";
import LoginPage from "./pages/LoginPage/LoginPage";

// libraries
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<CratesPage isLoggedIn={isLoggedIn} />} />
				<Route
					path='/login'
					element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
