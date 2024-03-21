import "./AddCratePage.scss";
import { baseUrl } from "../../utils/consts";

// components
import Header from "../../components/Header/Header";

// libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddCratePage() {
	const [crateName, setCrateName] = useState("new crate");

	const user_id = localStorage.getItem("audioFileId");
	const navigate = useNavigate();

	function handleChange(event) {
		setCrateName(event.target.value);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			await axios.post(`${baseUrl}/crates/${user_id}`, {
				name: event.target.crate_name.value,
				user_id,
			});

			navigate("/");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<main className='add-crate-page'>
			<Header text='add a crate' />
			<form className='add-crate-page__form' onSubmit={handleSubmit}>
				<label className='add-crate-page__label' htmlFor='crate_name'>
					name your crate
				</label>
				<input
					className='add-crate-page__field'
					type='text'
					value={crateName}
					name='crate_name'
					onChange={handleChange}
				/>
				<input
					className='add-crate-page__button'
					type='submit'
					value='add crate'
				/>
			</form>
		</main>
	);
}

export default AddCratePage;
