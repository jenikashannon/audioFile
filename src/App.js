import "./App.scss";

// pages
import CratesPage from "./pages/CratesPage/CratesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UsersPage from "./pages/UsersPage/UsersPage";

// libraries
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<CratesPage isLoggedIn={isLoggedIn} />} />
				<Route path='/login' element={<LoginPage />} />
				<Route
					path='/users'
					element={<UsersPage setIsLoggedIn={setIsLoggedIn} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
