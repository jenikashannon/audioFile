import "./Header.scss";

// components
import HeaderIcon from "../HeaderIcon/HeaderIcon";

function Header({
	text,
	mode,
	setEditMode,
	editMode,
	deleteMode,
	setDeleteMode,
}) {
	return (
		<header className='header'>
			<h1 className='header__title'>{text}</h1>
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
