import "./AddAlbumModal.scss";
import { baseUrl } from "../../utils/consts";
import { generateAuthHeader } from "../../utils/generateAuthHeader";

// components
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import ItemList from "../ItemList/ItemList";
import SearchBar from "../SearchBar/SearchBar";

// libraries
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddAlbumModal({
	toggleAddMode,
	setActiveAlbum,
	albumIds,
	setAlbumIds,
	viewAlbum,
	triggerSnackbar,
}) {
	const [resultList, setResultList] = useState([]);
	const [term, setTerm] = useState("");

	const token = localStorage.getItem("token");
	const crate_id = useParams().crate_id;

	const navigate = useNavigate();

	function handleClose() {
		toggleAddMode();
	}

	async function addAlbum(album_id) {
		try {
			const response = await axios.post(
				`${baseUrl}/crates/${crate_id}`,
				{
					album_id,
				},
				generateAuthHeader(token)
			);

			triggerSnackbar(response.data);

			setAlbumIds((prev) => {
				return [...prev, album_id];
			});
		} catch (error) {
			if (error.response.data === "authorize on spotify") {
				navigate("/authorize");
				return;
			}

			triggerSnackbar(error.response.data);
		}
	}

	async function searchSpotify(term) {
		try {
			const response = await axios.get(
				`${baseUrl}/spotify/search?term=${term}`,
				generateAuthHeader(token)
			);
			setResultList(response.data);
		} catch (error) {
			if (error.response.data === "authorize on spotify") {
				navigate("/authorize");
			}
		}
	}

	useEffect(() => {
		if (term) {
			searchSpotify(term);
		} else {
			setResultList([]);
		}
	}, [term]);

	return (
		<div className='add-album-modal'>
			<div className='add-album-modal__background'>
				<dialog className='add-album-modal__card add-album-modal__card--bottom-anchored'>
					<div className='add-album-modal__close-icon'>
						<Icon type='close' height='20' handleClose={handleClose} />
					</div>
					<p className='add-album-modal__title'>search for albums</p>
					<SearchBar
						term={term}
						setTerm={setTerm}
						placeholder='album, track, artist'
					/>
					<div className='add-album-modal__results'>
						{resultList.length === 0 && (
							<p className='add-album-modal__sub-header'>
								search results will appear here
							</p>
						)}
						<ItemList
							itemList={resultList}
							type='album'
							context='crate-add'
							setActiveAlbum={setActiveAlbum}
							addAlbum={addAlbum}
							albumIds={albumIds}
							viewAlbum={viewAlbum}
						/>
					</div>
					<Button
						text='done'
						handleClick={handleClose}
						className='add-album-modal__button'
					/>
				</dialog>
			</div>
		</div>
	);
}

export default AddAlbumModal;
