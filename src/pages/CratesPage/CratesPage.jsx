import "./CratesPage.scss";
import { baseUrl } from "../../utils/consts";
import { generateAuthHeader } from "../../utils/generateAuthHeader";
import { sortList } from "../../utils/sort";

// components
import Divider from "../../components/Divider/Divider";
import Header from "../../components/Header/Header";
import ItemList from "../../components/ItemList/ItemList";
import LoadingPage from "../LoadingPage/LoadingPage";
import SearchCratesModal from "../../components/SearchCratesModal/SearchCratesModal";
import Sorter from "../../components/Sorter/Sorter";
import SorterModal from "../../components/SorterModal/SorterModal";

// libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CratesPage({ triggerSnackbar }) {
	const [crateList, setCrateList] = useState(null);
	const [filteredCrateList, setFilteredCrateList] = useState(null);
	const [pinnedCrateList, setPinnedCrateList] = useState(null);
	const [sortedCrateList, setSortedCrateList] = useState(null);
	const [defaultCrate, setDefaultCrate] = useState(false);
	const [sortBy, setSortBy] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	const [searchMode, setSearchMode] = useState(false);
	const [sortMode, setSortMode] = useState(false);

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
			const response = await axios.delete(
				`${baseUrl}/crates/${crate_id}`,
				generateAuthHeader(token)
			);

			triggerSnackbar(response.data);

			getUserCrates();
		} catch (error) {
			if (error.response.data === "authorize on spotify") {
				navigate("/authorize");
			}

			triggerSnackbar(error.response.data);
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
		return <LoadingPage />;
	}

	return (
		<main className='crates-page'>
			<Header text='my crates' triggerSearch={toggleSearchModal} />
			<div className='crates-page__container'>
				<div className='crates-page__crates'>
					<ItemList
						itemList={pinnedCrateList}
						type='crate'
						context='pinned'
						togglePin={togglePin}
						deleteCrate={deleteCrate}
					/>

					{pinnedCrateList.length > 0 && <Divider />}

					{crateList.length > 0 && (
						<Sorter
							sortBy={sortBy}
							setSortMode={setSortMode}
							setSortOrder={setSortOrder}
							mode='crate'
						/>
					)}

					<ItemList
						itemList={sortedCrateList}
						type='crate'
						context='crates-page'
						togglePin={togglePin}
						deleteCrate={deleteCrate}
					/>
					{defaultCrate && (
						<p className='crates-page__default-text'>
							We've created your first crate for you, just tap it to make it
							your own.
						</p>
					)}
					{crateList.length === 0 && (
						<p className='crates-page__default-text'>
							it's so empty here, tap "new crate" to start collecting.
						</p>
					)}
				</div>
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
