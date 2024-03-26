import "./MenuModal.scss";
import { menuOptions } from "../../utils/menuOptions";

function MenuModal({
	setMenuMode,
	handleEdit,
	handleDelete,
	handlePin,
	type,
	isPinned,
}) {
	let handlers = {
		edit: handleEdit,
		delete: handleDelete,
		pin: handlePin,
		unpin: handlePin,
	};

	let options = [];

	if (type === "header") {
		options = ["edit", "delete"];
	}

	if (type === "crate") {
		const pinAction = isPinned ? "unpin" : "pin";
		options = [pinAction, "delete"];
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
							<svg
								xmlns='http://www.w3.org/2000/svg'
								height='24'
								viewBox='0 -960 960 960'
								width='24'
							>
								<path
									d={
										menuOptions.find((menuOption) =>
											menuOption.text.includes(option)
										).path
									}
								/>
							</svg>
							<p className='menu-modal__text'>{option + " crate"}</p>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default MenuModal;
