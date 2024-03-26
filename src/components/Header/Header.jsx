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
				<svg
					onClick={() => {
						navigate(-1);
					}}
					className='header__back'
					xmlns='http://www.w3.org/2000/svg'
					height='24'
					viewBox='0 -960 960 960'
					width='24'
				>
					<path d='M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z' />
				</svg>
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
					<HeaderIcon
						handleEdit={handleEdit}
						handleDelete={handleDelete}
						menuMode={menuMode}
						setMenuMode={setMenuMode}
						type='header'
					/>
				</>
			)}
		</header>
	);
}

export default Header;
