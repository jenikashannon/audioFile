// utils
import { baseUrl } from "../../utils/consts";
import { generateAuthHeader } from "../../utils/generateAuthHeader";

// libraries
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UsersPage() {
	const [authorizing, setAuthorizing] = useState(false);

	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const code = searchParams.get("code");
	const token = localStorage.getItem("token");

	async function saveUserSpotifyAuth() {
		try {
			if (authorizing) {
				await axios.post(
					`${baseUrl}/auth/authorizeSpotify?code=${code}`,
					{},
					generateAuthHeader(token)
				);

				navigate("/");
			}
		} catch (error) {
			console.log(error.response.data);
		}
	}
	useEffect(() => {
		saveUserSpotifyAuth();
	}, [authorizing]);

	useEffect(() => {
		setAuthorizing(true);
	}, []);

	return <div>loading...</div>;
}

export default UsersPage;
