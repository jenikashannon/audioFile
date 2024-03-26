import "./Item.scss";

// components
import AddIcon from "../AddIcon/AddIcon";
import HeaderIcon from "../HeaderIcon/HeaderIcon";

// libraries
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Item({
	item,
	type,
	setActiveAlbum,
	addAlbum,
	albumIds,
	editMode,
	deletedAlbumIds,
	setDeletedAlbumIds,
	togglePin,
	setDeleteMode,
}) {
	const [menuMode, setMenuMode] = useState(false);

	let albumCount;
	let details;
	let image;
	let handleClick;

	const navigate = useNavigate();

	function removeAlbum(id) {
		const newIds = [...deletedAlbumIds];
		newIds.push(id);
		setDeletedAlbumIds(newIds);
	}

	function handlePin() {
		togglePin(item.id);
	}

	function handleDelete() {
		setMenuMode(false);
		setDeleteMode(true);
	}

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
					changeAlbum={addAlbum}
					id={item.id}
					disable={albumIds.includes(item.id)}
					mode='add'
				/>
			)}
			{editMode && (
				<AddIcon changeAlbum={removeAlbum} id={item.id} mode='remove' />
			)}
			{type === "crate" && (
				<HeaderIcon
					menuMode={menuMode}
					setMenuMode={setMenuMode}
					handleDelete={handleDelete}
					handlePin={handlePin}
					type='crate'
				/>
			)}
		</article>
	);
}

export default Item;
