import "./AuthorizeSpotifyPage.scss";
import logo from "../../assets/logos/logo.png";

// components
import Button from "../../components/Button/Button";

function AuthorizeSpotifyPage() {
	const scope =
		"user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private playlist-modify-private playlist-modify-public user-read-recently-played user-library-modify user-library-read user-read-email user-read-private";

	async function handleClick() {
		window.location.replace(
			`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=${scope}`
		);
	}

	return (
		<main className='authorize-spotify-page'>
			<img
				className='authorize-spotify-page__logo'
				src={logo}
				alt='audiofil logo'
			/>
			<p className='authorize-spotify-page__text'>
				audioFile needs to connect to your Spotify account to work. Here's the
				information that we will have access to:
			</p>
			<p className='authorize-spotify-page__text'>
				To start sorting your albums, tell Spotify that you trust us by clicking
				the button below.
			</p>
			<Button text='connect to Spotify' handleClick={handleClick} />
		</main>
	);
}

export default AuthorizeSpotifyPage;
