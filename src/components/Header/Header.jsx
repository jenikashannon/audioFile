import "./Header.scss";

// components
import EditIcon from "../EditIcon/EditIcon";

function Header({ text, mode, setEditMode, editMode, setDeleting }) {
	return (
		<header className='header'>
			<h1 className='header__title'>{text}</h1>
			{mode === "edit-icon" ? (
				<EditIcon
					setEditMode={setEditMode}
					editMode={editMode}
					setDeleting={setDeleting}
				/>
			) : null}
		</header>
	);
}

export default Header;
