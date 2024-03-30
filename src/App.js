import "./App.scss";

// pages & components
import AddCratePage from "./pages/AddCratePage/AddCratePage";
import AuthorizeSpotifyPage from "./pages/AuthorizeSpotifyPage/AuthorizeSpotifyPage";
import CrateDetailsPage from "./pages/CrateDetailsPage/CrateDetailsPage";
import CratesPage from "./pages/CratesPage/CratesPage";
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import UsersPage from "./pages/UsersPage/UsersPage";

// libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { theme, createTheme } from "@mui/system";

// material ui components
import Snackbar from "@mui/material/Snackbar";

function App() {
	const [openSnackbar, setOpenSnackBar] = useState(false);
	const [snackbarMessage, setSnackBarMessage] = useState("");

	const vertical = "bottom";
	const horizontal = "center";
	const styles = [{ mb: 10 }];

	function closeSnackbar(event, reason) {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnackBar(false);
	}

	function triggerSnackbar(message) {
		setSnackBarMessage(message);
		setOpenSnackBar(true);
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<CratesPage triggerSnackbar={triggerSnackbar} />}
				/>
				<Route
					path='/login'
					element={<LoginPage triggerSnackbar={triggerSnackbar} />}
				/>
				<Route path='/authorize' element={<AuthorizeSpotifyPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route
					path='crates/:crate_id'
					element={<CrateDetailsPage triggerSnackbar={triggerSnackbar} />}
				/>
				<Route path='/crates' element={<AddCratePage />} />
				<Route
					path='/discover'
					element={<DiscoverPage triggerSnackbar={triggerSnackbar} />}
				/>
			</Routes>
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={openSnackbar}
				autoHideDuration={1500}
				onClose={closeSnackbar}
				message={snackbarMessage}
				sx={styles}
			/>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
