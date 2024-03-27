import "./ItemCrate.scss";

// components
import Icon from "../Icon/Icon";
import MenuModal from "../MenuModal/MenuModal";

// libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";

let handleAdd;

function ItemCrate({ crate, type, togglePin, deleteCrate }) {
	const [menuMode, setMenuMode] = useState(false);

	const navigate = useNavigate();

	function toggleModalOpen() {
		setMenuMode((prev) => {
			return !prev;
		});
	}

	const handleClick = () => {
		navigate(`/crates/${crate.id}`);
	};

	function handlePin() {
		togglePin(crate.id);
	}

	function handleDelete() {
		deleteCrate(crate.id);
	}

	return (
		<article className='item-crate'>
			<div className='item-crate__container' onClick={handleClick}>
				<img src={crate.cover_art} className='item-crate__image' />
				<div className='item-crate__container--text'>
					<p className='item-crate__name'>{crate.name}</p>
					<div className='item-crate__container--pin'>
						{crate.pinned_crate ? <Icon type='pin' height='10' /> : null}
						<p className='item-crate__details'>{`${crate.album_count} album${
							crate.album_count === 1 ? "" : "s"
						}`}</p>
					</div>
				</div>
			</div>

			{type === "adding-album" ? (
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
					menuType={"crate"}
					isPinned={crate.pinned_crate}
					handleDelete={handleDelete}
					handlePin={handlePin}
				/>
			)}
		</article>
	);
}

export default ItemCrate;
