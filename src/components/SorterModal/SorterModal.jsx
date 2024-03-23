import "./SorterModal.scss";

function SorterModal({ sortBy, setSortBy, setSortMode }) {
	const sorts = [
		{ sortBy: "", label: "recently added" },
		{ sortBy: "name", label: "album name" },
		{ sortBy: "artists", label: "artist" },
		{ sortBy: "release_date", label: "release date" },
		{ sortBy: "duration_ms", label: "duration" },
	];

	return (
		<article className='sorter-modal'>
			<div className='sorter-modal__card'>
				{sorts.map((sort) => {
					return (
						<div className='sorter-modal__container'>
							<p className='sorter-modal__option'>{sort.label}</p>
							{sort.sortBy === sortBy && "✔️"}
						</div>
					);
				})}
			</div>
		</article>
	);
}

export default SorterModal;
