import "./MenuModal.scss";

// components
import Icon from "../Icon/Icon";

function MenuModal({
	setMenuMode,
	handleEdit,
	handleDelete,
	handlePin,
	menuType,
	isPinned,
	handleAdd,
}) {
	const handlers = {
		edit: handleEdit,
		delete: handleDelete,
		pin: handlePin,
		unpin: handlePin,
		add: handleAdd,
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
			pin: "unpin crate",
			unpin: "unpin crate",
			delete: "delete crate",
		};
	}

	if (menuType === "album-discover-result") {
		options = ["add"];
		text = {
			add: "add to crate",
		};
	}

	return (
		<>
			<div
				className='menu-modal'
				onClick={() => {
					setMenuMode(false);
				}}
			></div>
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
