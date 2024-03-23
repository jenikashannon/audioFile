import "./CratesPage.scss";
import { baseUrl } from "../../utils/consts";
import { sortList } from "../../utils/sort";

// components
import Header from "../../components/Header/Header";
import ItemList from "../../components/ItemList/ItemList";
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
	const [sortedCrates, setSortedCrates] = useState(null);

	const user_id = localStorage.getItem("audioFileId");

	const navigate = useNavigate();

	async function getUserCrates() {
		try {
			const response = await axios.get(`${baseUrl}/crates?user_id=${user_id}`);
			setCrateList(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	function sortCrates() {
		setSortedCrates(sortList(crateList, sortBy, sortOrder));
	}

	useEffect(() => {
		if (!user_id) {
			navigate("/login");
		} else {
			getUserCrates();
		}
	}, []);

	useEffect(() => {
		if (crateList) {
			if (crateList.length === 1 && crateList[0].default_crate) {
				setDefaultCrate(true);
			}

			sortCrates();
		}
	}, [crateList]);

	useEffect(() => {
		getUserCrates();
	}, [sortBy, sortOrder]);

	if (!sortedCrates) {
		return <>Loading...</>;
	}

	return (
		<main className='crates-page'>
			<Header text='my crates' />
			<div className='crates-page__container'>
				<Sorter
					sortBy={sortBy}
					setSortMode={setSortMode}
					setSortOrder={setSortOrder}
					mode='crate'
				/>
				<div className='crates-page__crates'>
					<ItemList crateList={sortedCrates} />
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
