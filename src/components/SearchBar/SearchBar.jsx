import "./SearchBar.scss";

// libraries
import { useState } from "react";

function SearchBar({ scope }) {
	const [term, setTerm] = useState("");
	let search;

	if (scope === "spotify") {
		search = (term) => {};
	}

	async function handleChange(event) {
		setTerm(event.target.value);
	}

	return (
		<form className='searchbar'>
			<input
				className='searchbar__field'
				type='text'
				name='search'
				value={term}
				onChange={handleChange}
				placeholder='album, track, artist'
			/>
		</form>
	);
}

export default SearchBar;
