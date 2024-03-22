import "./SearchBar.scss";

// libraries
import { useState } from "react";

function SearchBar({ handleSearch }) {
	const [term, setTerm] = useState("");

	async function handleChange(event) {
		setTerm(event.target.value);
		handleSearch(term);
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
