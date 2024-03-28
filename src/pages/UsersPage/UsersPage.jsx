// utils
import { baseUrl } from "../../utils/consts";

// libraries
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function UsersPage() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const code = searchParams.get("code");
	const token = localStorage.getItem("token");

	async function saveUserSpotifyAuth() {
		try {
			await axios.post(`${baseUrl}/auth/authorizeSpotify?code=${code}`, {
				token,
			});
			navigate("/");
		} catch (error) {
			console.log(error.response.data);
		}
	}
	useEffect(() => {
		saveUserSpotifyAuth();
	}, []);

	return <div>loading...</div>;
}

export default UsersPage;
