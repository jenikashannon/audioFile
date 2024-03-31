import "./ItemAlbum.scss";

// components
import Icon from "../Icon/Icon";
import MenuModal from "../MenuModal/MenuModal";

// libraries
import { useState } from "react";

function ItemAlbum({
	albumIds,
	album,
	context,
	deleteAlbum,
	removeAlbum,
	saveAlbum,
	unsaveAlbum,
	viewAlbum,
	addAlbum,
	editMode,
	toggleAddMode,
}) {
	const [menuMode, setMenuMode] = useState(false);

	const menuContexts = ["crate-details", "discover"];

	function toggleModalOpen() {
		setMenuMode((prev) => {
			return !prev;
		});
	}

	function handleClick() {
		viewAlbum(album);
	}

	function handleDelete() {
		deleteAlbum(album.id);
	}

	function handleView() {
		viewAlbum(album);
		setMenuMode(false);
	}

	function handleAdd() {
		addAlbum(album.id);
	}

	function handleSave() {
		saveAlbum(album.id);
		setMenuMode(false);
	}

	function handleUnsave() {
		unsaveAlbum(album.id);
		setMenuMode(false);
	}

	function handleRemove() {
		removeAlbum(album.id);
	}

	function openAddModal() {
		setMenuMode(false);
		toggleAddMode({ id: album.id, name: album.name });
	}

	return (
		<article className='item-album'>
			<div className='item-album__container' onClick={handleClick}>
				<img src={album.image} className='item-album__image' />
				<div className='item-album__container--text'>
					<p className='item-album__name'>{album.name}</p>
					<p className='item-album__details'>{album.artists.join(", ")}</p>
				</div>
			</div>

			{context === "crate-add" && (
				<Icon
					disable={albumIds.includes(album.id)}
					type='add'
					height='12'
					handleAdd={handleAdd}
				/>
			)}

			{editMode && (
				<Icon type='remove' height='12' handleRemove={handleRemove} />
			)}

			{menuContexts.includes(context) && !editMode && (
				<Icon
					type='menuHorizontal'
					height='20'
					toggleModalOpen={toggleModalOpen}
				/>
			)}

			{menuMode && (
				<MenuModal
					menuType={`album-${context}`}
					toggleModalOpen={toggleModalOpen}
					handleRemove={handleRemove}
					handleView={handleView}
					handleDelete={handleDelete}
					handleAdd={openAddModal}
					handleSave={handleSave}
					handleUnsave={handleUnsave}
					isSaved={album.is_saved}
				/>
			)}
		</article>
	);
}

export default ItemAlbum;
