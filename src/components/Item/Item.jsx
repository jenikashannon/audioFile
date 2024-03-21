import "./Item.scss";

// libraries
import { Link } from "react-router-dom";

function Item({ item, type, mode }) {
	const user_id = localStorage.getItem("audioFileId");

	let albumCount;

	if (type === "crate") {
		albumCount =
			item.album_count === 1
				? item.album_count + " album"
				: item.album_count + " albums";
	}

	return (
		<Link to={`/crates/${item.id}`} className='item'>
			<img src={item.cover_art} className='item__icon' />
			<div className='item__container'>
				<div className='item__container--text'>
					<p className='item__name'>{item.name}</p>
					{<p className='item__details'>{albumCount}</p>}
				</div>
				{type === "crate" ? (
					<svg
						className='item__icon'
						xmlns='https://localhost:1700/icons/edit.svg'
						height='18'
						viewBox='0 -960 960 960'
						width='18'
					>
						<path d='M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z' />
					</svg>
				) : null}
			</div>
		</Link>
	);
}

export default Item;
