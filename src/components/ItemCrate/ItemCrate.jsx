import "./ItemCrate.scss";

// components
import DeleteModal from "../DeleteModal/DeleteModal";
import Icon from "../Icon/Icon";
import MenuModal from "../MenuModal/MenuModal";

// libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ItemCrate({
	crate,
	context,
	togglePin,
	deleteCrate,
	addAlbumToCrate,
}) {
	const [menuMode, setMenuMode] = useState(false);
	const [deleteMode, setDeleteMode] = useState(false);

	const navigate = useNavigate();

	function toggleModalOpen() {
		setMenuMode((prev) => {
			return !prev;
		});
	}

	const handleClick = () => {
		if (context !== "add-to-crates") {
			navigate(`/crates/${crate.id}`);
		}
	};

	function handlePin() {
		togglePin(crate.id);
	}

	function triggerDelete() {
		setMenuMode(false);
		setDeleteMode(true);
	}

	function handleDelete() {
		deleteCrate(crate.id);
	}

	function handleAdd() {
		addAlbumToCrate(crate.id);
	}

	if (context === "pinned") {
		return (
			<article className='item-crate--pinned'>
				<div onClick={handleClick}>
					<p className='item-crate--pinned__name'>{crate.name}</p>
					<p className='item-crate--pinned__album-count'>
						{crate.album_count} album{crate.album_count === 1 ? "" : "s"}
					</p>
				</div>
				<div className='item-crate--pinned__container--icon'>
					<Icon
						type='menuHorizontal'
						menuType='crate'
						toggleModalOpen={toggleModalOpen}
						height='20'
					/>
				</div>

				{menuMode && (
					<MenuModal
						toggleModalOpen={toggleModalOpen}
						menuType='crate-pinned'
						isPinned={crate.pinned_crate}
						handleDelete={triggerDelete}
						handlePin={handlePin}
					/>
				)}

				{deleteMode && (
					<DeleteModal
						deleteCrate={handleDelete}
						setDeleteMode={setDeleteMode}
						name={crate.name}
					/>
				)}
			</article>
		);
	}

	return (
		<article className='item-crate'>
			<div className='item-crate__container' onClick={handleClick}>
				<img src={crate.cover_art} className='item-crate__image' />
				<div className='item-crate__container--text'>
					<p className='item-crate__name'>{crate.name}</p>
					<div className='item-crate__container--pin'>
						<p className='item-crate__details'>
							{crate.album_count} album{crate.album_count === 1 ? "" : "s"}
						</p>
					</div>
				</div>
			</div>

			{context === "add-to-crates" ? (
				<Icon type='add' height='16' handleAdd={handleAdd} />
			) : (
				<Icon
					type='menuHorizontal'
					menuType='crate'
					toggleModalOpen={toggleModalOpen}
					height='20'
				/>
			)}

			{menuMode && (
				<MenuModal
					toggleModalOpen={toggleModalOpen}
					menuType='crate'
					isPinned={crate.pinned_crate}
					handleDelete={triggerDelete}
					handlePin={handlePin}
				/>
			)}

			{deleteMode && (
				<DeleteModal
					deleteCrate={handleDelete}
					setDeleteMode={setDeleteMode}
					name={crate.name}
				/>
			)}
		</article>
	);
}

export default ItemCrate;
