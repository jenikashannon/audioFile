import "./MenuModal.scss";

// components
import Icon from "../Icon/Icon";

function MenuModal({
	handleEdit,
	handleDelete,
	handleLogout,
	handlePin,
	handleSave,
	handleUnsave,
	handleView,
	menuType,
	isPinned,
	isSaved,
	handleAdd,
	toggleModalOpen,
}) {
	const handlers = {
		edit: handleEdit,
		delete: handleDelete,
		pin: handlePin,
		unpin: handlePin,
		add: handleAdd,
		save: handleSave,
		unsave: handleUnsave,
		view: handleView,
		logout: handleLogout,
	};

	let options = [];
	let text;

	if (menuType === "logout") {
		options = ["logout"];
		text = {
			logout: "log out",
		};
	}

	if (menuType === "crate-header") {
		options = ["edit", "delete"];
		text = {
			edit: "edit crate",
			delete: "delete crate",
		};
	}

	if (["crate", "crate-pinned"].includes(menuType)) {
		const pinAction = isPinned ? "unpin" : "pin";
		options = [pinAction, "delete"];
		text = {
			pin: "pin crate",
			unpin: "unpin crate",
			delete: "delete crate",
		};
	}

	if (menuType === "album-crate-details") {
		const saveAction = isSaved ? "unsave" : "save";
		options = ["add", "view", saveAction];
		text = {
			add: "add to other crate",
			delete: "remove from crate",
			view: "view album details",
			save: "save to Spotify",
			unsave: "remove from Spotify library",
		};
	}

	if (menuType === "album-discover") {
		const saveAction = isSaved ? "unsave" : "save";
		options = ["add", "view", saveAction];
		text = {
			add: "add to crates",
			view: "view album details",
			save: "save to Spotify library",
			unsave: "remove from Spotify library",
		};
	}

	return (
		<>
			<div className='menu-modal' onClick={toggleModalOpen}></div>
			<div
				className={`menu-modal__card ${
					menuType === "crate-header"
						? "menu-modal__card--header"
						: menuType === "crate-pinned"
						? "menu-modal__card--pinned"
						: menuType === "logout"
						? "menu-modal__card--logout"
						: ""
				}`}
			>
				{options.map((option) => {
					return (
						<div
							key={option}
							className='menu-modal__option'
							onClick={handlers[option]}
						>
							<Icon type={option} height='14' />
							<p className='menu-modal__text'>{text[option]}</p>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default MenuModal;
