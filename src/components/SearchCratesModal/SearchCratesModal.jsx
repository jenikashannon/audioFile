import "./SearchCratesModal.scss";

// components
import ItemList from "../ItemList/ItemList";
import SearchBar from "../../components/SearchBar/SearchBar";

// libraries
import { useState, useEffect } from "react";
import Fuse from "fuse.js";

function SearchCratesModal({ crateList, toggleSearchModal }) {
	const [searchedCrateList, setSearchedCrateList] = useState([]);
	const [term, setTerm] = useState("");

	const options = {
		keys: ["name", "albums.name", "albums.tracks.name", "albums.artists"],
		threshold: 0.2,
		includeMatches: true,
		findAllMatches: true,
		ignoreLocation: true,
		minMatchCharLength: 2,
	};

	function searchCrates(term) {
		if (term.length < 2) {
			return setSearchedCrateList([]);
		}

		const fuse = new Fuse(crateList, options);
		const results = fuse.search(term);

		const formattedResults = results.map((result) => {
			const item = { ...result.item, matches: result.matches };

			return item;
		});
		console.log(formattedResults);

		setSearchedCrateList(formattedResults);
	}

	useEffect(() => {
		searchCrates(term);
	}, [term]);

	return (
		<div className='search-crates-modal'>
			<div
				className='search-crates-modal__background'
				onClick={toggleSearchModal}
			></div>
			<dialog className='search-crates-modal__card search-crates-modal__card--bottom-anchored'>
				<SearchBar
					handleSearch={searchCrates}
					setTerm={setTerm}
					term={term}
					placeholder='find a crate by name, album, track, artist'
				/>
				<h1 className='search-crates-modal__title'>crate results</h1>
				{searchedCrateList.length === 0 && (
					<p className='search-crates-modal__directive-text'>
						search results will appear here.
					</p>
				)}
				<div className='search-crates-modal__results'>
					<ItemList
						itemList={searchedCrateList}
						type='crate'
						context='search'
					/>
				</div>
				<button
					className='search-crates-modal__close'
					onClick={toggleSearchModal}
				>
					close
				</button>
			</dialog>
		</div>
	);
}

export default SearchCratesModal;
