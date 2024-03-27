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
	const [activeAlbum, setActiveAlbum] = useState(null);
	const [sortMode, setSortMode] = useState(false);
	const [sortBy, setSortBy] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	const [sortedAlbums, setSortedAlbums] = useState(null);
	const [deletedAlbumIds, setDeletedAlbumIds] = useState([]);

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

	async function deleteAlbum(album_id) {
		try {
			await axios.delete(`${baseUrl}/crates/${crate_id}/${album_id}`);
			getCrateDetails();
		} catch (error) {
			console.log(error);
		}
	}

	function removeAlbum(album_id) {
		setDeletedAlbumIds((prev) => {
			return [...prev, album_id];
		});
	}

	function viewAlbum(album) {
		setActiveAlbum(album);
	}

	async function updateCrateName() {
		try {
			await axios.patch(`${baseUrl}/crates/${crate_id}/`, {
				name: crateName,
				user_id,
			});
			getCrateDetails();
		} catch (error) {
			console.log(error);
		}
	}

	function toggleAddMode() {
		setAddMode(true);
	}

	function saveEdits() {
		setEditMode(false);

		// if new crate name, update crate
		if (crateName !== crate.name) {
			updateCrateName(crateName);
		}

		// delete any removed albums
		if (deletedAlbumIds.length > 0) {
			deletedAlbumIds.forEach((albumId) => {
				deleteAlbum(albumId);
			});
		}
	}

	function abortEdits() {
		setEditMode(false);
		setDeletedAlbumIds([]);
		setCrateName(crate.name);
	}

	function sortAlbums() {
		setSortedAlbums(
			sortList(crate.albums, sortBy, sortOrder).filter(
				(album) => !deletedAlbumIds.includes(album.id)
			)
		);
	}

	function triggerEdit() {
		setEditMode(true);
	}

	function triggerDelete() {
		setDeleteMode(true);
	}

	useEffect(() => {
		getCrateDetails();
	}, [addMode, sortBy, sortOrder]);

	useEffect(() => {
		if (crate) {
			sortAlbums();
		}
	}, [crate, deletedAlbumIds]);

	if (!sortedAlbums) {
		return <>Loading...</>;
	}

	return (
		<main className='crate-details-page'>
			<Header
				mode='crate-details'
				setEditMode={setEditMode}
				editMode={editMode}
				setDeleteMode={setDeleteMode}
				crateName={crateName}
				setCrateName={setCrateName}
				triggerEdit={triggerEdit}
				triggerDelete={triggerDelete}
			/>
			<div className='crate-details-page__container'>
				<Sorter
					sortBy={sortBy}
					setSortMode={setSortMode}
					setSortOrder={setSortOrder}
					mode='album'
				/>
				<div className='crate-details-page__albums'>
					<ItemList
						itemList={sortedAlbums}
						type='album'
						context='crate-details'
						viewAlbum={viewAlbum}
						editMode={editMode}
						deletedAlbumIds={deletedAlbumIds}
						setDeletedAlbumIds={setDeletedAlbumIds}
						albumIds={albumIds}
						deleteAlbum={deleteAlbum}
						removeAlbum={removeAlbum}
					/>
				</div>
				<div className='crate-details-page__button-container'>
					{editMode && (
						<Button text='cancel' type='cancel' handleClick={abortEdits} />
					)}
					<Button
						text={editMode ? "save" : "add albums"}
						type={editMode ? "save" : ""}
						handleClick={editMode ? saveEdits : toggleAddMode}
					/>
				</div>
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
					viewAlbum={viewAlbum}
				/>
			)}

			{sortMode && (
				<SorterModal
					sortBy={sortBy}
					setSortBy={setSortBy}
					setSortMode={setSortMode}
					setSortOrder={setSortOrder}
					mode='album'
				/>
			)}
		</main>
	);
}

export default CrateDetailsPage;
