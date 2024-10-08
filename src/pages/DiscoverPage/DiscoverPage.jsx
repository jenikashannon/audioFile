import "./DiscoverPage.scss";
import { baseUrl } from "../../utils/consts";
import { generateAuthHeader } from "../../utils/generateAuthHeader";

// components
import AddToCratesModal from "../../components/AddToCratesModal/AddToCratesModal";
import AlbumDetailsModal from "../../components/AlbumDetailsModal/AlbumDetailsModal";
import Footer from "../../components/Footer/Footer";
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

	async function saveAlbum(album_id) {
		try {
			const response = await axios.put(
				`${baseUrl}/spotify/save?album_id=${album_id}`,
				{},
				generateAuthHeader(token)
			);

			searchSpotify(term);
			triggerSnackbar(response.data);
		} catch (error) {
			if (error.response.data === "authorize on spotify") {
				navigate("/authorize");
			}

			triggerSnackbar(error.response.data);
		}
	}

	async function unsaveAlbum(album_id) {
		try {
			const response = await axios.delete(
				`${baseUrl}/spotify/remove?album_id=${album_id}`,
				generateAuthHeader(token)
			);

			searchSpotify(term);
			triggerSnackbar(response.data);
		} catch (error) {
			if (error.response.data === "authorize on spotify") {
				navigate("/authorize");
			}

			triggerSnackbar(error.response.data);
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
				<SearchBar
					term={term}
					setTerm={setTerm}
					placeholder='search Spotify by album, track, artist'
				/>
				<div className='discover-page__results'>
					{discoverList.length === 0 && (
						<p className='discover-page__sub-header'>
							add some albums to your collection by searching Spotify above.
						</p>
					)}
					<ItemList
						itemList={discoverList}
						type='album'
						context='discover'
						toggleAddMode={toggleAddMode}
						saveAlbum={saveAlbum}
						unsaveAlbum={unsaveAlbum}
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
			<Footer />
		</main>
	);
}

export default DiscoverPage;
