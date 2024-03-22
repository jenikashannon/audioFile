import "./Header.scss";

// components
import HeaderIcon from "../HeaderIcon/HeaderIcon";

function Header({ text, mode, setEditMode, editMode, setDeleting }) {
	return (
		<header className='header'>
			<h1 className='header__title'>{text}</h1>
			{mode === "edit-icon" ? (
				<HeaderIcon
					setEditMode={setEditMode}
					editMode={editMode}
					setDeleting={setDeleting}
				/>
			) : null}
		</header>
	);
}

export default Header;
