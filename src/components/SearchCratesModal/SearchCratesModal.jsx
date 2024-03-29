import "./SearchCratesModal.scss";

// components
import ItemList from "../ItemList/ItemList";
import SearchBar from "../../components/SearchBar/SearchBar";

// libraries
import axios from "axios";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";

function SearchCratesModal({ setSearchMode, crateList }) {
	const [searchedCrateList, setSearchedCrateList] = useState([]);
	const [term, setTerm] = useState("");

	const token = localStorage.getItem("token");

	const options = {
		keys: ["name", "albums.name", "albums.tracks.name", "albums.artists"],
		threshold: 0.2,
		includeMatches: true,
		findAllMatches: true,
		ignoreLocation: true,
		minMatchCharLength: 2,
	};

	function closeModal() {
		setSearchMode(false);
		setTerm("");
	}

	function searchCrates(term) {
		if (!term) {
			return setSearchedCrateList([]);
		}

		const fuse = new Fuse(crateList, options);
		const results = fuse.search(term);

		const formattedResults = results.map((result) => {
			const item = { ...result.item, matches: result.matches };

			return item;
		});

		setSearchedCrateList(formattedResults);
	}

	useEffect(() => {
		searchCrates(term);
	}, [term]);

	return (
		<article className='search-crates-modal__card search-crates-modal__card--bottom-anchored'>
			<SearchBar
				handleSearch={searchCrates}
				setTerm={setTerm}
				term={term}
				setSearchMode={setSearchMode}
				handleSearchBarClick={() => {
					setSearchMode(true);
				}}
			/>
			<h1 className='search-crates-modal__title'>crate results</h1>
			<div className='search-crates-modal__results'>
				<ItemList itemList={searchedCrateList} type='crate' context='search' />
			</div>
			<button className='search-crates-modal__close' onClick={closeModal}>
				cancel
			</button>
		</article>
	);
}

export default SearchCratesModal;
