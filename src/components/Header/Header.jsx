import "./Header.scss";

// components
import Icon from "../Icon/Icon";
import MenuModal from "../MenuModal/MenuModal";

// libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({
	mode,
	text,
	editMode,
	crateName,
	setCrateName,
	triggerDelete,
	triggerEdit,
	triggerSearch,
}) {
	const [menuMode, setMenuMode] = useState(false);

	const navigate = useNavigate();

	function handleChange(event) {
		setCrateName(event.target.value);
	}

	function toggleModalOpen() {
		setMenuMode((prev) => {
			return !prev;
		});
	}

	function handleDelete() {
		setMenuMode(false);
		triggerDelete();
	}

	function handleEdit() {
		setMenuMode(false);
		triggerEdit();
	}

	function handleSearch() {
		triggerSearch();
	}

	return (
		<header className='header'>
			{mode !== "crate-details" && <h1 className='header__title'>{text}</h1>}
			{!editMode && ["crate-details", "search"].includes(mode) && (
				<Icon
					type={mode === "crate-details" ? "back" : "search"}
					height={mode === "crate-details" ? "12" : "24"}
					fill='white'
					handleBack={() => {
						navigate("/");
					}}
					handleSearch={handleSearch}
				/>
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
					<Icon
						type='menu'
						height='18'
						fill='white'
						toggleModalOpen={toggleModalOpen}
					/>
				</>
			)}

			{menuMode && (
				<MenuModal
					menuType='crate-header'
					toggleModalOpen={toggleModalOpen}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
				/>
			)}
		</header>
	);
}

export default Header;
