import "./MenuModal.scss";

// components
import Icon from "../Icon/Icon";

function MenuModal({
	handleEdit,
	handleDelete,
	handlePin,
	handleView,
	menuType,
	isPinned,
	handleAdd,
	toggleModalOpen,
}) {
	const handlers = {
		edit: handleEdit,
		delete: handleDelete,
		pin: handlePin,
		unpin: handlePin,
		add: handleAdd,
		view: handleView,
	};

	let options = [];
	let text;

	if (menuType === "header") {
		options = ["edit", "delete"];
		text = {
			edit: "edit crate",
			delete: "delete crate",
		};
	}

	if (menuType === "crate") {
		const pinAction = isPinned ? "unpin" : "pin";
		options = [pinAction, "delete"];
		text = {
			pin: "pin crate",
			unpin: "unpin crate",
			delete: "delete crate",
		};
	}

	if (menuType === "album") {
		options = ["delete", "add", "view"];
		text = {
			add: "add to other crate",
			delete: "remove from crate",
			view: "view album details",
		};
	}

	return (
		<>
			<div className='menu-modal' onClick={toggleModalOpen}></div>
			<div className='menu-modal__card'>
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
