import "./CratesPage.scss";
import { baseUrl } from "../../utils/consts";
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
			setPinnedCrateList(response.data.filter((crate) => crate.pinned_crate));
			setFilteredCrateList(
				response.data.filter((crate) => !crate.pinned_crate)
			);
		} catch (error) {
			console.log(error);
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
			await axios.put(`${baseUrl}/crates/${crate_id}`);
			getUserCrates();
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (!user_id) {
			navigate("/authorize");
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
					<ItemList crateList={pinnedCrateList} togglePin={togglePin} />
					<ItemList crateList={sortedCrateList} togglePin={togglePin} />
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
