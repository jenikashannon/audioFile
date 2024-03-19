import "./LoginPage.scss";

function LoginPage({ setIsLoggedIn }) {
	return (
		<main>
			<p>
				audioFile needs to connect to your Spotify account to work. Here's the
				information that we will have access to:
			</p>
			<p>To start sorting your albums, authorize us to the above information</p>
			<button>connect to Spotify</button>
		</main>
	);
}

export default LoginPage;
