import "./DiscoverPage.scss";
import { baseUrl } from "../../utils/consts";

// components
import AddToCratesModal from "../../components/AddToCratesModal/AddToCratesModal";
import AlbumDetailsModal from "../../components/AlbumDetailsModal/AlbumDetailsModal";
import Header from "../../components/Header/Header";
import ItemList from "../../components/ItemList/ItemList";
import SearchBar from "../../components/SearchBar/SearchBar";

// libraries
import axios from "axios";
import { useState, useEffect } from "react";

function DiscoverPage() {
	const [term, setTerm] = useState("");
	const [discoverList, setDiscoverList] = useState([]);
	const [addMode, setAddMode] = useState(false);
	const [crateList, setCrateList] = useState(null);
	const [activeAlbum, setActiveAlbum] = useState(null);

	const user_id = localStorage.getItem("audioFileId");

	async function getUserCrateNames() {
		try {
			const response = await axios.get(
				`${baseUrl}/crates?type=name&user_id=${user_id}`
			);
			setCrateList(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	async function searchSpotify(term) {
		try {
			const response = await axios.get(
				`${baseUrl}/spotify/search?term=${term}&user_id=${user_id}`
			);
			setDiscoverList(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	async function toggleAddMode(id) {
		setAddMode(true);
		setActiveAlbum(id);
	}

	async function addAlbumToCrate(crate_id) {
		try {
			await axios.post(`${baseUrl}/crates/${crate_id}`, {
				album_id: activeAlbum,
				user_id,
			});
		} catch (error) {
			console.log(error);
		}
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

	useEffect(() => {
		getUserCrateNames();
	}, []);

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
						// addAlbum={addAlbum}
						// albumIds={albumIds}
					/>
				</div>
			</div>

			{addMode && (
				<AddToCratesModal
					crateList={crateList}
					addAlbumToCrate={addAlbumToCrate}
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
