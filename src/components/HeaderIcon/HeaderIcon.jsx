import "./HeaderIcon.scss";

import { useState } from "react";

function HeaderIcon({ setEditMode, editMode, deleteMode, setDeleteMode }) {
	const [menuMode, setMenuMode] = useState(false);

	function handleClick() {
		setMenuMode(true);
	}

	function handleEdit() {
		setMenuMode(false);
		setEditMode(true);
	}

	function handleDelete() {
		setMenuMode(false);
		setDeleteMode(true);
	}

	return (
		<div className='header-icon'>
			{/* {!editMode && !deleteMode && ( */}
			<svg
				onClick={handleClick}
				className='header-icon__button'
				xmlns='http://www.w3.org/2000/svg'
				height='24'
				viewBox='0 -960 960 960'
				width='24'
			>
				<path d='M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z' />
			</svg>
			{/* )} */}

			{menuMode && (
				<div className='header-icon__menu'>
					<div className='header-icon__option' onClick={handleEdit}>
						<svg
							className='header-icon__button--dark'
							xmlns='http://www.w3.org/2000/svg'
							height='24'
							viewBox='0 -960 960 960'
							width='24'
						>
							<path d='M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z' />
						</svg>
						<p className='header-icon__option-text'>edit crate</p>
					</div>
					<div className='header-icon__option' onClick={handleDelete}>
						<svg
							className='header-icon__button--dark'
							xmlns='http://www.w3.org/2000/svg'
							height='24'
							viewBox='0 -960 960 960'
							width='24'
						>
							<path d='M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z' />
						</svg>
						<p className='header-icon__option-text'>delete crate</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default HeaderIcon;
