import "./Item.scss";

// components
import AddIcon from "../AddIcon/AddIcon";
import Icon from "../Icon/Icon";

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
	toggleAddMode,
	addAlbumToCrate,
}) {
	const [menuMode, setMenuMode] = useState(false);

	let albumCount;
	let details;
	let image;
	let handleClick;

	const navigate = useNavigate();

	function deleteAlbum(id) {
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

	function handleAdd() {
		if (type === "album-discover-result") {
			toggleAddMode(item.id);
			return;
		}

		if (type === "crate-add") {
			addAlbumToCrate(item.id);
			return;
		}
	}

	if (type === "crate" || type === "crate-result") {
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

	if (type === "crate-add") {
		details = [item.name, null];
	}

	if (["album", "album-result", "album-discover-result"].includes(type)) {
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
					<div className='item__container--pin'>
						{type === "crate" && item.pinned_crate ? (
							<svg
								className='item__pin-icon'
								xmlns='http://www.w3.org/2000/svg'
								height='24'
								viewBox='0 -960 960 960'
								width='24'
							>
								<path d='m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z' />
							</svg>
						) : null}
						<p className='item__details'>{details[1]}</p>
					</div>
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
			{type === "crate-add" && (
				<Icon type='add' height='16' handleAdd={handleAdd} />
			)}
			{editMode && (
				<AddIcon changeAlbum={deleteAlbum} id={item.id} mode='remove' />
			)}
			{type === "crate" && (
				<Icon
					menuMode={menuMode}
					setMenuMode={setMenuMode}
					handleDelete={handleDelete}
					handlePin={handlePin}
					type='menuHorizontal'
					menuType='crate'
					isPinned={item.pinned_crate}
					height='20'
				/>
			)}
			{type === "album-discover-result" && (
				<Icon
					type='menuHorizontal'
					menuType='album-discover-result'
					height='20'
					menuMode={menuMode}
					setMenuMode={setMenuMode}
					handleAdd={handleAdd}
				/>
			)}
		</article>
	);
}

export default Item;
