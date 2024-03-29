import "./CratesPage.scss";
import { baseUrl } from "../../utils/consts";
import { generateAuthHeader } from "../../utils/generateAuthHeader";
import { sortList } from "../../utils/sort";

// components
import Header from "../../components/Header/Header";
import ItemList from "../../components/ItemList/ItemList";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchCratesModal from "../../components/SearchCratesModal/SearchCratesModal";
import Sorter from "../../components/Sorter/Sorter";
import SorterModal from "../../components/SorterModal/SorterModal";

// libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Fuse from "fuse.js";

function CratesPage() {
	const [crateList, setCrateList] = useState(null);
	const [defaultCrate, setDefaultCrate] = useState(false);
	const [sortMode, setSortMode] = useState(false);
	const [sortBy, setSortBy] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	const [pinnedCrateList, setPinnedCrateList] = useState(null);
	const [sortedCrateList, setSortedCrateList] = useState(null);
	const [filteredCrateList, setFilteredCrateList] = useState(null);
	const [searchedCrateList, setSearchedCrateList] = useState([]);
	const [term, setTerm] = useState("");
	const [searchMode, setSearchMode] = useState(false);

	const token = localStorage.getItem("token");

	const navigate = useNavigate();

	const options = {
		keys: ["name", "albums.name", "albums.tracks.name", "albums.artists"],
		threshold: 0.2,
		includeMatches: true,
		findAllMatches: true,
		ignoreLocation: true,
		minMatchCharLength: 2,
	};

	async function getUserCrates() {
		try {
			const response = await axios.get(
				`${baseUrl}/crates`,
				generateAuthHeader(token)
			);
			setCrateList(response.data);
			setPinnedCrateList(response.data.filter((crate) => crate.pinned_crate));
			setFilteredCrateList(
				response.data.filter((crate) => !crate.pinned_crate)
			);
		} catch (error) {
			if (error.response.data === "authorize on spotify") {
				navigate("/authorize");
			}
		}
	}

	function sortCrates() {
		setSortedCrateList(sortList(filteredCrateList, sortBy, sortOrder));
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

	async function togglePin(crate_id) {
		try {
			await axios.put(
				`${baseUrl}/crates/${crate_id}`,
				{},
				generateAuthHeader(token)
			);
			getUserCrates();
		} catch (error) {
			if (error.response.data === "authorize on spotify") {
				navigate("/authorize");
			}
		}
	}

	async function deleteCrate(crate_id) {
		try {
			await axios.delete(
				`${baseUrl}/crates/${crate_id}`,
				generateAuthHeader(token)
			);
			getUserCrates();
		} catch (error) {
			if (error.response.data === "authorize on spotify") {
				navigate("/authorize");
			}
		}
	}

	useEffect(() => {
		if (!token) {
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
				<SearchBar
					handleSearch={searchCrates}
					setTerm={setTerm}
					term={term}
					setSearchMode={setSearchMode}
					handleSearchBarClick={() => {
						setSearchMode(true);
					}}
				/>
				<Sorter
					sortBy={sortBy}
					setSortMode={setSortMode}
					setSortOrder={setSortOrder}
					mode='crate'
				/>
				<div className='crates-page__crates'>
					<ItemList
						itemList={pinnedCrateList}
						type='crate'
						togglePin={togglePin}
						deleteCrate={deleteCrate}
					/>
					<ItemList
						itemList={sortedCrateList}
						type='crate'
						togglePin={togglePin}
						deleteCrate={deleteCrate}
					/>
				</div>
				{defaultCrate && (
					<p className='crates-page__default-text'>
						We've created your first crate for you, just click the edit icon to
						make it your own.
					</p>
				)}
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

			{searchMode && (
				<SearchCratesModal
					searchedCrateList={searchedCrateList}
					setSearchMode={setSearchMode}
					setTerm={setTerm}
				/>
			)}
		</main>
	);
}

export default CratesPage;
