import "./AddPhotoModal.scss";

// components
import Button from "../Button/Button";

// libraries
import { useParams } from "react-router-dom";

function AddPhotoModal({ name, setEditPhotoMode }) {
	const crate_id = useParams().crate_id;

	function handleCancel() {
		setEditPhotoMode(false);
	}

	return (
		<div className='add-photo-modal'>
			<article className='add-photo-modal__background'></article>
			<dialog className='add-photo-modal__card'>
				<p className='add-photo-modal__text'>
					upload a new cover photo for{" "}
					<span className='add-photo-modal__text--name'>{name}</span>.
				</p>

				<form>
					<input type='file' name='photo' />
				</form>

				<div className='add-photo-modal__button-container'>
					<Button text='cancel' type='cancel' handleClick={handleCancel} />
					<Button
						text='update photo'
						type='add-photo'
						// handleClick={handleDelete}
					/>
				</div>
			</dialog>
		</div>
	);
}

export default AddPhotoModal;
