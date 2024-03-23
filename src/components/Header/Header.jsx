import "./Header.scss";

// components
import HeaderIcon from "../HeaderIcon/HeaderIcon";

function Header({
	mode,
	setEditMode,
	editMode,
	deleteMode,
	setDeleteMode,
	crateName,
	setCrateName,
}) {
	function handleChange(event) {
		setCrateName(event.target.value);
	}

	return (
		<header className='header'>
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
			{mode === "edit-icon" ? (
				<HeaderIcon
					setEditMode={setEditMode}
					editMode={editMode}
					deleteMode={deleteMode}
					setDeleteMode={setDeleteMode}
				/>
			) : null}
		</header>
	);
}

export default Header;
