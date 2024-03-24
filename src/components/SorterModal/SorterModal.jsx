import "./SorterModal.scss";
import { sortsAlbum, sortsCrate } from "../../utils/sort";

// libraries
import { useRef } from "react";
import { useClickAway } from "react-use";

function SorterModal({ sortBy, setSortBy, setSortMode, setSortOrder, mode }) {
	const sorts = mode === "album" ? sortsAlbum : sortsCrate;

	const ref = useRef(null);
	useClickAway(ref, () => {
		setSortMode(false);
	});

	return (
		<article className='sorter-modal'>
			<div className='sorter-modal__card' ref={ref}>
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
						className='sorter-modal__close'
						onClick={() => {
							setSortMode(false);
						}}
					>
						close
					</button>
				</div>
			</div>
		</article>
	);
}

export default SorterModal;
