import "./HeaderIcon.scss";

// components
import MenuModal from "../MenuModal/MenuModal";

function HeaderIcon({
	menuMode,
	setMenuMode,
	handleEdit,
	handleDelete,
	handlePin,
	type,
	isPinned,
}) {
	const paths = {
		crate:
			"M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z",
		header:
			"M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z",
	};

	function handleClick() {
		setMenuMode((prev) => {
			return !prev;
		});
	}

	return (
		<div className='header-icon'>
			<svg
				onClick={handleClick}
				className='header-icon__button'
				xmlns='http://www.w3.org/2000/svg'
				height='24'
				viewBox='0 -960 960 960'
				width='24'
			>
				<path d={paths[type]} />
			</svg>

			{menuMode && (
				<MenuModal
					type={type}
					setMenuMode={setMenuMode}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
					handlePin={handlePin}
					isPinned={isPinned}
				/>
			)}
		</div>
	);
}

export default HeaderIcon;
