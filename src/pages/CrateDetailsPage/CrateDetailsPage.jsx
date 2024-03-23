import "./CrateDetailsPage.scss";
import { baseUrl } from "../../utils/consts";
import { sortList } from "../../utils/sort";

// components
import AddAlbumModal from "../../components/AddAlbumModal/AddAlbumModal";
import AlbumDetailsModal from "../../components/AlbumDetailsModal/AlbumDetailsModal";
import Button from "../../components/Button/Button";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import Header from "../../components/Header/Header";
import ItemList from "../../components/ItemList/ItemList";
import Sorter from "../../components/Sorter/Sorter";
import SorterModal from "../../components/SorterModal/SorterModal";

// libraries
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function CrateDetailsPage() {
	const [crate, setCrate] = useState(null);
	const [crateName, setCrateName] = useState(null);
	const [albumIds, setAlbumIds] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [deleteMode, setDeleteMode] = useState(false);
	const [addMode, setAddMode] = useState(false);
	const [sortMode, setSortMode] = useState(false);
	const [activeAlbum, setActiveAlbum] = useState(null);
	const [sortBy, setSortBy] = useState("");
	const [sortedAlbums, setSortedAlbums] = useState(null);

	const crate_id = useParams().crate_id;
	const user_id = localStorage.getItem("audioFileId");

	const navigate = useNavigate();

	async function getCrateDetails() {
		try {
			const response = await axios.get(
				`${baseUrl}/crates/${crate_id}?user_id=${user_id}`
			);
			setCrate(response.data);

			const albums = response.data.albums.map((album) => {
				return album.id;
			});

			setAlbumIds(albums);
			setCrateName(response.data.name);
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteCrate() {
		try {
			await axios.delete(`${baseUrl}/crates/${crate_id}`);
		} catch (error) {
			console.log(error);
		}

		navigate("/");
	}

	async function removeAlbum(album_id) {
		try {
			await axios.delete(`${baseUrl}/crates/${crate_id}/${album_id}`);
			getCrateDetails();
		} catch (error) {
			console.log(error);
		}
	}

	// name, artist, duration, release year

	async function updateCrateName(name) {
		try {
			await axios.patch(`${baseUrl}/crates/${crate_id}/`, {
				name: crateName,
			});
			getCrateDetails();
		} catch (error) {
			console.log(error);
		}
	}

	async function toggleAddMode() {
		setAddMode(true);
	}

	async function toggleEditMode() {
		setEditMode(false);

		// if new crate name, update crate
		if (crateName !== crate.name) {
			updateCrateName(crateName);
		}
	}

	function sortAlbums() {
		setSortedAlbums(sortList(crate.albums, sortBy));
	}

	useEffect(() => {
		getCrateDetails();
	}, [addMode, sortBy]);

	useEffect(() => {
		if (crate) {
			sortAlbums();
		}
	}, [crate]);

	useEffect(() => {}, [sortBy, sortedAlbums]);

	if (!sortedAlbums) {
		return <>Loading...</>;
	}

	return (
		<main className='crate-details-page'>
			<Header
				mode='edit-icon'
				setEditMode={setEditMode}
				editMode={editMode}
				deleteMode={deleteMode}
				setDeleteMode={setDeleteMode}
				crateName={crateName}
				setCrateName={setCrateName}
			/>
			<div className='crate-details-page__container'>
				<Sorter sortBy={sortBy} setSortMode={setSortMode} />
				<div className='crate-details-page__albums'>
					<ItemList
						albumList={sortedAlbums}
						setActiveAlbum={setActiveAlbum}
						editMode={editMode}
						removeAlbum={removeAlbum}
						albumIds={albumIds}
					/>
				</div>
				<Button
					text={editMode ? "save" : "add albums"}
					handleClick={editMode ? toggleEditMode : toggleAddMode}
				/>
			</div>

			{deleteMode && (
				<DeleteModal
					deleteCrate={deleteCrate}
					setDeleteMode={setDeleteMode}
					name={crate.name}
				/>
			)}

			{activeAlbum && (
				<AlbumDetailsModal
					album={activeAlbum}
					setActiveAlbum={setActiveAlbum}
				/>
			)}

			{addMode && (
				<AddAlbumModal
					setAddMode={setAddMode}
					setActiveAlbum={setActiveAlbum}
					albumIds={albumIds}
					setAlbumIds={setAlbumIds}
				/>
			)}

			{sortMode && (
				<SorterModal
					sortBy={sortBy}
					setSortBy={setSortBy}
					setSortMode={setSortMode}
				/>
			)}
		</main>
	);
}

export default CrateDetailsPage;
