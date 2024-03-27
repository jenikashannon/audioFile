import "./Header.scss";

// components
import HeaderIcon from "../HeaderIcon/HeaderIcon";
import Icon from "../Icon/Icon";

// libraries
import { useNavigate } from "react-router-dom";

function Header({
	mode,
	text,
	editMode,
	crateName,
	setCrateName,
	menuMode,
	setMenuMode,
	handleEdit,
	handleDelete,
}) {
	const navigate = useNavigate();

	function handleChange(event) {
		setCrateName(event.target.value);
	}

	return (
		<header className='header'>
			{mode !== "crate-details" && <h1 className='header__title'>{text}</h1>}
			{mode === "crate-details" && !editMode && (
				<Icon type='back' height='12' fill='white' />
			)}
			{mode === "crate-details" && (
				<>
					<input
						className={`header__title ${
							editMode ? "header__title--active" : ""
						}`}
						type='text'
						value={crateName}
						onChange={handleChange}
					></input>
					<Icon type='menu' height='18' fill='white' />
				</>
			)}
		</header>
	);
}

export default Header;
