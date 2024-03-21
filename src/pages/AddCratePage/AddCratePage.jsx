import "./AddCratePage.scss";
import { baseUrl } from "../../utils/consts";

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
		<main>
			<form onSubmit={handleSubmit}>
				<label htmlFor='crate_name'>name your crate</label>
				<input
					type='text'
					value={crateName}
					name='crate_name'
					onChange={handleChange}
				/>
				<input
					type='submit'
					value='make my crate!
                '
				/>
			</form>
		</main>
	);
}

export default AddCratePage;
