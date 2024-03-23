import "./SorterModal.scss";
import { sortsAlbum, sortsCrate } from "../../utils/sort";

function SorterModal({ sortBy, setSortBy, setSortMode, setSortOrder, mode }) {
	const sorts = mode === "album" ? sortsAlbum : sortsCrate;

	return (
		<article className='sorter-modal'>
			<div className='sorter-modal__card'>
				<p className='sorter-modal__title'>sort by</p>
				<div className='sorter-modal__container'>
					{sorts.map((sort) => {
						return (
							<div
								key={sort.sortBy}
								className='sorter-modal__link'
								onClick={() => {
									setSortBy(sort.sortBy);
									setSortOrder("asc");
									setSortMode(false);
								}}
							>
								<p
									className={`sorter-modal__option ${
										sort.sortBy === sortBy && "sorter-modal__option--active"
									}`}
								>
									{sort.label}
								</p>
								{sort.sortBy === sortBy && "✔️"}
							</div>
						);
					})}
					<button
						className='sorter-modal__cancel'
						onClick={() => {
							setSortMode(false);
						}}
					>
						cancel
					</button>
				</div>
			</div>
		</article>
	);
}

export default SorterModal;
