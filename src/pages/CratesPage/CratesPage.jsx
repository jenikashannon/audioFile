import "./CratesPage.scss";

// components

// libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CratesPage({ isLoggedIn }) {
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login");
		}
	}, []);

	return <div>crates are right here</div>;
}

export default CratesPage;
