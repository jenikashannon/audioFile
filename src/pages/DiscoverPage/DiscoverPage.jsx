import "./DiscoverPage.scss";
import { baseUrl } from "../../utils/consts";

// components
import Header from "../../components/Header/Header";
import ItemList from "../../components/ItemList/ItemList";
import SearchBar from "../../components/SearchBar/SearchBar";

// libraries
import axios from "axios";
import { useState, useEffect } from "react";

function DiscoverPage() {
	const [term, setTerm] = useState("");
	const [discoverList, setDiscoverList] = useState([]);

	const user_id = localStorage.getItem("audioFileId");

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
						discoverList={discoverList}
						// setActiveAlbum={setActiveAlbum}
						// addAlbum={addAlbum}
						// albumIds={albumIds}
					/>
				</div>
			</div>
		</main>
	);
}

export default DiscoverPage;
