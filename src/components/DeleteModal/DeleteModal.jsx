import "./DeleteModal.scss";

// components
import Button from "../Button/Button";

// libraries
import { useParams } from "react-router-dom";

function DeleteModal({ deleteCrate, setDeleteMode, name }) {
	const crate_id = useParams().crate_id;

	function handleDelete() {
		deleteCrate(crate_id);
	}

	function handleCancel() {
		setDeleteMode(false);
	}

	return (
		<div className='delete-modal'>
			<article className='delete-modal__background'></article>
			<dialog className='delete-modal__card'>
				<p className='delete-modal__text'>
					are you sure you want to delete{" "}
					<span className='delete-modal__text--name'>{name}</span>? this action
					cannot be reversed.
				</p>

				<div className='delete-modal__button-container'>
					<Button text='cancel' type='cancel' handleClick={handleCancel} />
					<Button
						text='permanently delete'
						type='delete'
						handleClick={handleDelete}
					/>
				</div>
			</dialog>
		</div>
	);
}

export default DeleteModal;
