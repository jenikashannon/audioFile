import "./App.scss";

// pages & components
import AddCratePage from "./pages/AddCratePage/AddCratePage";
import CratesPage from "./pages/CratesPage/CratesPage";
import Footer from "./components/Footer/Footer";
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
				<Route path='/crates' element={<AddCratePage />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
