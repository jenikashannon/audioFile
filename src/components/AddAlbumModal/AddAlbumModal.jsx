import "./AddAlbumModal.scss";
import { baseUrl } from "../../utils/consts";

// components
import CloseIcon from "../CloseIcon/CloseIcon";
import ItemList from "../ItemList/ItemList";
import SearchBar from "../SearchBar/SearchBar";

// libraries
import { useState } from "react";
import axios from "axios";

function AddAlbumModal({ setAddMode }) {
	const [resultList, setResultList] = useState([]);

	const user_id = localStorage.getItem("audioFileId");

	function handleClose() {
		setAddMode(false);
	}

	async function searchSpotify(term) {
		if (term) {
			try {
				const response = await axios.get(
					`${baseUrl}/spotify/search?term=${term}&user_id=${user_id}`
				);
				setResultList(response.data);
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<article className='add-album-modal'>
			<div className='add-album-modal__card add-album-modal__card--long'>
				<CloseIcon handleClose={handleClose} />
				<h1 className='add-album-modal__title'>search for albums</h1>
				<SearchBar handleSearch={searchSpotify} />
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
