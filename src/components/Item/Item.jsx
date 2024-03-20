import "./Item.scss";

// libraries
import { Link } from "react-router-dom";

function Item({ item, type }) {
	const user_id = localStorage.getItem("audioFileId");

	let albumCount;

	if (type === "crate") {
		albumCount =
			item.album_count === 1
				? item.album_count + " album"
				: item.album_count + " albums";
	}

	return (
		<Link to={`/crates/${user_id}/${item.id}`} className='item'>
			<img src={item.cover_art} className='item__icon' />
			<div className='item__container'>
				<p className='item__name'>{item.name}</p>
				{<p className='item__details'>{albumCount}</p>}
			</div>
		</Link>
	);
}

export default Item;
