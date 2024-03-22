import "./Item.scss";

// components
import EditIcon from "../EditIcon/EditIcon";

// libraries
import { Link } from "react-router-dom";

function Item({ item, type, mode }) {
	let albumCount;
	let details;
	let image;
	let path;

	if (type === "crate") {
		albumCount =
			item.album_count === 1
				? item.album_count + " album"
				: item.album_count + " albums";

		details = [item.name, albumCount];
		image = item.cover_art;
		path = `/crates/${item.id}`;
	}

	if (type === "album") {
		details = [item.name, item.artists.join(", ")];
		image = item.image;
	}

	return (
		<Link to={path} className='item'>
			<img src={image} className='item__image' />
			<div className='item__container'>
				<div className='item__container--text'>
					<p className='item__name'>{details[0]}</p>
					{<p className='item__details'>{details[1]}</p>}
				</div>
				{type === "" ? <EditIcon /> : null}
			</div>
		</Link>
	);
}

export default Item;
