import "./MenuModal.scss";

// components
import Icon from "../Icon/Icon";

function MenuModal({
	handleEdit,
	handleDelete,
	handleLogout,
	handlePin,
	handlePlay,
	handleProfile,
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
		play: handlePlay,
		save: handleSave,
		unsave: handleUnsave,
		view: handleView,
		logout: handleLogout,
		profile: handleProfile,
	};

	let options = [];
	let text;

	if (menuType === "crates-page") {
		options = ["profile", "logout"];
		text = {
			profile: "profile",
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
		options = ["add", "delete", "view", saveAction, "play"];
		text = {
			add: "add to other crate",
			delete: "remove from crate",
			view: "view album details",
			save: "save to Spotify library",
			unsave: "remove from Spotify library",
			play: "play album on Spotify",
		};
	}

	if (menuType === "album-discover") {
		const saveAction = isSaved ? "unsave" : "save";
		options = ["add", "view", saveAction, "play"];
		text = {
			add: "add to crates",
			view: "view album details",
			save: "save to Spotify library",
			unsave: "remove from Spotify library",
			play: "play album on Spotify",
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
						: menuType === "crates-page"
						? "menu-modal__card--crates-page"
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
