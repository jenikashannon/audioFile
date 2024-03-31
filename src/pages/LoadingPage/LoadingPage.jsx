import "./LoadingPage.scss";
import logo from "../../assets/logos/loading-logo.png";

function LoadingPage() {
	return (
		<div className='loading-page'>
			<img className='loading-page__logo' src={logo} alt='audiofile-logo' />
		</div>
	);
}

export default LoadingPage;
