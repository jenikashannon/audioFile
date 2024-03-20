import "./LoginPage.scss";

function LoginPage() {
	const scope =
		"user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private playlist-modify-private playlist-modify-public user-read-recently-played user-library-modify user-library-read user-read-email user-read-private";

	async function handleClick() {
		window.location.replace(
			`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=${scope}`
		);
	}

	return (
		<main>
			<p>
				audioFile needs to connect to your Spotify account to work. Here's the
				information that we will have access to:
			</p>
			<p>To start sorting your albums, authorize us to the above information</p>
			<button onClick={handleClick}>connect to Spotify</button>
		</main>
	);
}

export default LoginPage;
