import "./Sorter.scss";
import { sortsAlbum, sortsCrate } from "../../utils/sort";

function Sorter({ sortBy, setSortMode, setSortOrder, mode }) {
	function handleSort() {
		setSortMode(true);
	}

	function handleChangeOrder() {
		setSortOrder((prev) => {
			if (prev === "asc") {
				return "desc";
			} else {
				return "asc";
			}
		});
	}

	const sorts = mode === "album" ? sortsAlbum : sortsCrate;
	const currentSort = sorts.find((sort) => sort.sortBy === sortBy);

	return (
		<div className='sorter'>
			<p className='sorter__label' onClick={handleSort}>
				sorted by <span className='sorter__type'>{currentSort.label}</span>
			</p>
			<svg
				onClick={handleChangeOrder}
				className='sorter__icon'
				xmlns='http://www.w3.org/2000/svg'
				height='24'
				viewBox='0 -960 960 960'
				width='24'
			>
				<path d='M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z' />
			</svg>
		</div>
	);
}

export default Sorter;
