import "./AddAlbumModal.scss";

// components
import CloseIcon from "../CloseIcon/CloseIcon";
import ItemList from "../ItemList/ItemList";
import SearchBar from "../SearchBar/SearchBar";

// libraries
import { useState } from "react";

function AddAlbumModal({ setAddMode }) {
	const [resultList, setResultList] = useState([]);

	function handleClose() {
		setAddMode(false);
	}

	return (
		<article className='add-album-modal'>
			<div className='add-album-modal__card add-album-modal__card--long'>
				<CloseIcon handleClose={handleClose} />
				<h1 className='add-album-modal__title'>search for albums</h1>
				<SearchBar scope='spotify' />
				<div className='add-album-modal__results'>
					{resultList.length === 0 && (
						<h2 className='add-album-modal__sub-header'>no results...</h2>
					)}
					<ItemList resultList={resultList} />
				</div>
			</div>
		</article>
	);
}

export default AddAlbumModal;
