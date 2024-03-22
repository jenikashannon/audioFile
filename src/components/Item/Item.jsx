import "./Item.scss";

// components
import AddIcon from "../AddIcon/AddIcon";

// libraries
import { useNavigate } from "react-router-dom";

function Item({ item, type, mode, setActiveAlbum, addAlbum, albumIds }) {
	let albumCount;
	let details;
	let image;
	let handleClick;

	const navigate = useNavigate();

	if (type === "crate") {
		albumCount =
			item.album_count === 1
				? item.album_count + " album"
				: item.album_count + " albums";

		details = [item.name, albumCount];
		image = item.cover_art;

		handleClick = () => {
			navigate(`/crates/${item.id}`);
		};
	}

	if (["album", "album-result"].includes(type)) {
		details = [item.name, item.artists.join(", ")];
		image = item.image;

		handleClick = () => {
			setActiveAlbum(item);
		};
	}

	return (
		<article className='item'>
			<div className='item__container' onClick={handleClick}>
				<img src={image} className='item__image' />
				<div className='item__container--text'>
					<p className='item__name'>{details[0]}</p>
					<p className='item__details'>{details[1]}</p>
				</div>
			</div>
			{type === "album-result" && (
				<AddIcon
					addAlbum={addAlbum}
					id={item.id}
					disable={albumIds.includes(item.id)}
				/>
			)}
		</article>
	);
}

export default Item;
