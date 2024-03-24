import "./CratesPage.scss";
import { baseUrl } from "../../utils/consts";
import { sortList } from "../../utils/sort";

// components
import Header from "../../components/Header/Header";
import ItemList from "../../components/ItemList/ItemList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Sorter from "../../components/Sorter/Sorter";
import SorterModal from "../../components/SorterModal/SorterModal";

// libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FuzzySearch from "fuzzy-search";
import Fuse from "fuse.js";

function CratesPage() {
	const [crateList, setCrateList] = useState(null);
	const [defaultCrate, setDefaultCrate] = useState(false);
	const [sortMode, setSortMode] = useState(false);
	const [sortBy, setSortBy] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	const [sortedCrateList, setSortedCrateList] = useState(null);
	const [filteredCrateList, setFilteredCrateList] = useState(null);
	const [term, setTerm] = useState("");

	const user_id = localStorage.getItem("audioFileId");

	const navigate = useNavigate();

	const options = {
		keys: ["name", "albums", "tracks", "artists"],
		threshold: 0.2,
		includeMatches: true,
		findAllMatches: true,
		ignoreLocation: true,
		minMatchCharLength: 2,
	};

	async function getUserCrates() {
		try {
			const response = await axios.get(`${baseUrl}/crates?user_id=${user_id}`);
			setCrateList(response.data);
			setFilteredCrateList(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	function sortCrates() {
		setSortedCrateList(sortList(filteredCrateList, sortBy, sortOrder));
	}

	function searchCrates(term) {
		if (!term) {
			return setFilteredCrateList(crateList);
		}

		const fuse = new Fuse(crateList, options);
		const results = fuse.search(term);

		const formattedResults = results.map((result) => {
			const item = { ...result.item, matches: result.matches };

			return item;
		});

		console.log(formattedResults);
		setFilteredCrateList(formattedResults);
	}

	useEffect(() => {
		if (!user_id) {
			navigate("/login");
		} else {
			getUserCrates();
		}
	}, []);

	useEffect(() => {
		getUserCrates();
	}, [sortBy, sortOrder]);

	useEffect(() => {
		if (filteredCrateList) {
			if (
				filteredCrateList.length === 1 &&
				filteredCrateList[0].default_crate
			) {
				setDefaultCrate(true);
			}

			sortCrates();
		}
	}, [filteredCrateList]);

	useEffect(() => {
		searchCrates(term);
	}, [term]);

	if (!sortedCrateList) {
		return <>Loading...</>;
	}

	return (
		<main className='crates-page'>
			<Header text='my crates' />
			<div className='crates-page__container'>
				<SearchBar handleSearch={searchCrates} setTerm={setTerm} term={term} />
				<Sorter
					sortBy={sortBy}
					setSortMode={setSortMode}
					setSortOrder={setSortOrder}
					mode='crate'
				/>
				<div className='crates-page__crates'>
					<ItemList crateList={sortedCrateList} />
				</div>
				{defaultCrate ? (
					<p className='crates-page__default-text'>
						We've created your first crate for you, just click the edit icon to
						make it your own.
					</p>
				) : null}
			</div>

			{sortMode && (
				<SorterModal
					sortBy={sortBy}
					setSortBy={setSortBy}
					setSortMode={setSortMode}
					setSortOrder={setSortOrder}
					mode='crate'
				/>
			)}
		</main>
	);
}

export default CratesPage;
