import "./SearchBar.scss";

function SearchBar({ term, setTerm }) {
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
