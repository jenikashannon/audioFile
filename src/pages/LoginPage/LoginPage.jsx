import "./LoginPage.scss";
import logo from "../../assets/logos/logo.png";
import { baseUrl } from "../../utils/consts";

// libraries
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage({ triggerSnackbar }) {
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			const response = await axios.post(`${baseUrl}/auth/login`, {
				email: event.target.email.value,
				password: event.target.password.value,
			});

			localStorage.setItem("token", response.data.token);

			navigate("/");
		} catch (error) {
			console.log(error);
			triggerSnackbar(error.response.data);
		}
	}

	return (
		<main className='login-page' onSubmit={handleSubmit}>
			<img className='login-page__logo' src={logo} alt='audiofil logo' />
			<form className='login-page__form'>
				<label className='login-page__label' htmlFor='email'>
					email
				</label>
				<input
					className='login-page__field'
					type='text'
					id='email'
					name='email'
				/>
				<label className='login-page__label' htmlFor='password'>
					password
				</label>
				<input
					className='login-page__field'
					type='password'
					id='password'
					name='password'
				/>
				<input className='login-page__button' type='submit' value='log in' />
			</form>
		</main>
	);
}

export default LoginPage;
