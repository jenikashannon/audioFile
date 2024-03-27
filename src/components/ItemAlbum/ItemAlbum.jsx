import "./ItemAlbum.scss";

// components
import Icon from "../Icon/Icon";
import MenuModal from "../MenuModal/MenuModal";

// libraries
import { useState } from "react";

function ItemAlbum({ album, type, context, removeAlbum, viewAlbum }) {
	const [menuMode, setMenuMode] = useState(false);

	const menuAlbumContexts = ["crate-details", "discover"];

	function toggleModalOpen() {
		setMenuMode((prev) => {
			return !prev;
		});
	}

	function handleClick() {
		viewAlbum(album);
	}

	function handleDelete() {
		removeAlbum(album.id);
	}

	function handleView() {
		viewAlbum(album);
		setMenuMode(false);
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
			{context === "adding-crate" && (
				<Icon
					// changeAlbum={addAlbum}
					id={album.id}
					// disable={albumIds.includes(item-album.id)}
					mode='add'
				/>
			)}

			{/* {editMode && <Icon id={album.id} mode='remove' />} */}

			{menuAlbumContexts.includes(context) && (
				<Icon
					type='menuHorizontal'
					menuType='album-discover-result'
					height='20'
					toggleModalOpen={toggleModalOpen}
				/>
			)}

			{menuMode && (
				<MenuModal
					menuType='album'
					toggleModalOpen={toggleModalOpen}
					handleDelete={handleDelete}
					handleView={handleView}
				/>
			)}
		</article>
	);
}

export default ItemAlbum;
