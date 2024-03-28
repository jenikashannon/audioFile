// utils
import { baseUrl } from "../../utils/consts";

// libraries
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function UsersPage({ setIsLoggedIn }) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const code = searchParams.get("code");

	async function createUser() {
		try {
			const response = await axios.get(
				`${baseUrl}/auth/authorizeSpotify?code=${code}`
			);

			localStorage.setItem("audioFileId", response.data.id);

			setIsLoggedIn(true);

			navigate("/");
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		createUser();
	}, []);

	return <div>here</div>;
}

export default UsersPage;
