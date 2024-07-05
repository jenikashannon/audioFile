import "./AddCratePage.scss";
import { baseUrl } from "../../utils/consts";
import { generateAuthHeader } from "../../utils/generateAuthHeader";

// components
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

// libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddCratePage({ triggerSnackbar }) {
	const [crateName, setCrateName] = useState("new crate");

	const token = localStorage.getItem("token");

	const navigate = useNavigate();

	function handleChange(event) {
		setCrateName(event.target.value);
	}

	async function handleSubmit(event) {
		event.preventDefault();

		const form = document.getElementById("form");
		const formData = new FormData(form);

		try {
			const response = await axios.post(
				`${baseUrl}/crates?`,
				{ name: crateName },
				generateAuthHeader(token)
			);
			triggerSnackbar(response.data);
			navigate(`/`);
		} catch (error) {
			if (error.response.data === "authorize on spotify") {
				navigate("/authorize");
			}

			triggerSnackbar(error.response.data);
		}
	}

	return (
		<main className='add-crate-page'>
			<Header text='add a crate' />
			<form
				className='add-crate-page__form'
				onSubmit={handleSubmit}
				encType='multipart/form-data'
				id='form'
			>
				<label className='add-crate-page__label' htmlFor='name'>
					name your crate
				</label>
				<input
					className='add-crate-page__field'
					type='text'
					value={crateName}
					name='name'
					onChange={handleChange}
				/>

				{/* <input name='id' value={id} hidden /> */}
				<label className='add-crate-page__label' htmlFor='photo'>
					add a photo to your crate
				</label>
				<input className='add-crate-page__file' type='file' name='photo' />
				<input
					className='add-crate-page__button'
					type='submit'
					value='add crate'
				/>
			</form>
			<Footer />
		</main>
	);
}

export default AddCratePage;
