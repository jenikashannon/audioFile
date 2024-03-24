import "./Header.scss";

// components
import HeaderIcon from "../HeaderIcon/HeaderIcon";

function Header({
	mode,
	text,
	setEditMode,
	editMode,
	setDeleteMode,
	crateName,
	setCrateName,
	menuMode,
	setMenuMode,
}) {
	function handleChange(event) {
		setCrateName(event.target.value);
	}

	return (
		<header className='header'>
			{mode !== "crate-details" && <h1 className='header__title'>{text}</h1>}
			{editMode ? (
				<input
					className='header__title header__title--active'
					type='text'
					value={crateName}
					onChange={handleChange}
					autoFocus
				></input>
			) : (
				<input
					className='header__title'
					type='text'
					value={crateName}
					disabled
				></input>
			)}
			{mode === "crate-details" && (
				<HeaderIcon
					setEditMode={setEditMode}
					setDeleteMode={setDeleteMode}
					menuMode={menuMode}
					setMenuMode={setMenuMode}
				/>
			)}
		</header>
	);
}

export default Header;
