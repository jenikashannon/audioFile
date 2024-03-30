import "./DiscoverPage.scss";
import { baseUrl } from "../../utils/consts";
import { generateAuthHeader } from "../../utils/generateAuthHeader";

// components
import AddToCratesModal from "../../components/AddToCratesModal/AddToCratesModal";
import AlbumDetailsModal from "../../components/AlbumDetailsModal/AlbumDetailsModal";
import Header from "../../components/Header/Header";
import ItemList from "../../components/ItemList/ItemList";
import SearchBar from "../../components/SearchBar/SearchBar";

// libraries
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DiscoverPage({ triggerSnackbar }) {
	const [term, setTerm] = useState("");
	const [discoverList, setDiscoverList] = useState([]);
	const [addMode, setAddMode] = useState(false);

	const [activeAlbum, setActiveAlbum] = useState(null);
	const [albumToAdd, setAlbumToAdd] = useState(null);

	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	async function searchSpotify(term) {
		try {
			const response = await axios.get(
				`${baseUrl}/spotify/search?term=${term}`,
				generateAuthHeader(token)
			);
			setDiscoverList(response.data);
		} catch (error) {
			if (error.response.data === "authorize on spotify") {
				navigate("/authorize");
			}
		}
	}

	async function toggleAddMode(album) {
		setAddMode((prev) => {
			return !prev;
		});

		setAlbumToAdd((prev) => {
			if (!prev) {
				return album;
			}

			return null;
		});
	}

	function viewAlbum(album) {
		setActiveAlbum(album);
	}

	useEffect(() => {
		if (term) {
			searchSpotify(term);
		} else {
			setDiscoverList([]);
		}
	}, [term]);

	return (
		<main className='discover-page'>
			<Header text='discover records' />
			<div className='discover-page__container'>
				<SearchBar term={term} setTerm={setTerm} />
				<div className='discover-page__results'>
					{discoverList.length === 0 && (
						<h2 className='discover-page__sub-header'>
							search Spotify for albums to add to your collection.
						</h2>
					)}
					<ItemList
						itemList={discoverList}
						type='album'
						context='discover'
						toggleAddMode={toggleAddMode}
						viewAlbum={viewAlbum}
					/>
				</div>
			</div>

			{addMode && (
				<AddToCratesModal
					toggleAddMode={toggleAddMode}
					albumToAdd={albumToAdd}
					triggerSnackbar={triggerSnackbar}
				/>
			)}

			{activeAlbum && (
				<AlbumDetailsModal
					album={activeAlbum}
					setActiveAlbum={setActiveAlbum}
				/>
			)}
		</main>
	);
}

export default DiscoverPage;
