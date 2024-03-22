import "./AddAlbumModal.scss";

// components
import CloseIcon from "../CloseIcon/CloseIcon";

function AddAlbumModal({ setAddMode }) {
	function handleClose() {
		setAddMode(false);
	}

	return (
		<article className='add-album-modal'>
			<div className='add-album-modal__card add-album-modal__card--long'>
				<CloseIcon handleClose={handleClose} />
				<h1 className='add-album-modal__title'>Search for albums</h1>
			</div>
		</article>
	);
}

export default AddAlbumModal;
