import "./CrateDetailsPage.scss";
import { baseUrl } from "../../utils/consts";

// components
import Button from "../../components/Button/Button";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import Header from "../../components/Header/Header";
import ItemList from "../../components/ItemList/ItemList";

// libraries
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function CrateDetailsPage() {
	const [crate, setCrate] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [deleteMode, setDeleteMode] = useState(false);

	const crate_id = useParams().crate_id;
	const user_id = localStorage.getItem("audioFileId");

	const navigate = useNavigate();

	async function getCrateDetails() {
		try {
			const response = await axios.get(
				`${baseUrl}/crates/${crate_id}?user_id=${user_id}`
			);
			setCrate(response.data);
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

	useEffect(() => {
		getCrateDetails();
	}, []);

	if (!crate) {
		return <>Loading...</>;
	}

	return (
		<main className='crate-details-page'>
			<Header
				text={crate.name}
				mode='edit-icon'
				setEditMode={setEditMode}
				editMode={editMode}
				deleteMode={deleteMode}
				setDeleteMode={setDeleteMode}
			/>
			<div className='crate-details-page__container'>
				{editMode && <Button text='add albums' />}
				<ItemList albumList={crate.albums} />
			</div>
			{deleteMode && (
				<DeleteModal
					deleteCrate={deleteCrate}
					setDeleteMode={setDeleteMode}
					name={crate.name}
				/>
			)}
		</main>
	);
}

export default CrateDetailsPage;
