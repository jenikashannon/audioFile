import "./CratesPage.scss";
import { baseUrl } from "../../utils/consts";
import { generateAuthHeader } from "../../utils/generateAuthHeader";
import { sortList } from "../../utils/sort";

// components
import Header from "../../components/Header/Header";
import ItemList from "../../components/ItemList/ItemList";
import SearchCratesModal from "../../components/SearchCratesModal/SearchCratesModal";
import Sorter from "../../components/Sorter/Sorter";
import SorterModal from "../../components/SorterModal/SorterModal";

// libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CratesPage() {
	const [crateList, setCrateList] = useState(null);
	const [defaultCrate, setDefaultCrate] = useState(false);
	const [sortMode, setSortMode] = useState(false);
	const [sortBy, setSortBy] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	const [pinnedCrateList, setPinnedCrateList] = useState(null);
	const [sortedCrateList, setSortedCrateList] = useState(null);
	const [filteredCrateList, setFilteredCrateList] = useState(null);

	const [searchMode, setSearchMode] = useState(false);

	const token = localStorage.getItem("token");

	const navigate = useNavigate();

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

	function toggleSearchModal() {
		setSearchMode((prev) => {
			return !prev;
		});
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

	if (!sortedCrateList) {
		return <>Loading...</>;
	}

	return (
		<main className='crates-page'>
			<Header text='my crates' triggerSearch={toggleSearchModal} />
			<div className='crates-page__container'>
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
					toggleSearchModal={toggleSearchModal}
					crateList={crateList}
				/>
			)}
		</main>
	);
}

export default CratesPage;
