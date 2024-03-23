import "./Sorter.scss";

function Sorter({ sortBy, setSortMode }) {
	let label;
	switch (sortBy) {
		case "name":
			label = "album name";
			break;
		case "artists":
			label = "artist";
			break;
		case "release_date":
			label = "release date";
			break;
		case "name":
			label = "album name";
			break;
		case "duration_ms":
			label = "duration";
			break;
		default:
			label = "date added";
			break;
	}

	function handleClick() {
		setSortMode(true);
	}

	return (
		<div className='sorter' onClick={handleClick}>
			<svg
				className='sorter__icon'
				xmlns='http://www.w3.org/2000/svg'
				height='24'
				viewBox='0 -960 960 960'
				width='24'
			>
				<path d='M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z' />
			</svg>
			<p className='sorter__label'>{label}</p>
		</div>
	);
}

export default Sorter;
