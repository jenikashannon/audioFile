import "./AddToCratesModal.scss";
import { baseUrl } from "../../utils/consts";
import { generateAuthHeader } from "../../utils/generateAuthHeader";

// components
import Icon from "../Icon/Icon";
import ItemList from "../ItemList/ItemList";

// libraries
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddToCratesModal({ albumToAdd, toggleAddMode }) {
	const [crateList, setCrateList] = useState(null);

	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	async function getUserCrateNames() {
		try {
			const response = await axios.get(
				`${baseUrl}/crates?type=album_ids`,
				generateAuthHeader(token)
			);

			const cratesWithoutAlbum = response.data.filter((crate) => {
				return !crate.albumIds.includes(albumToAdd.id);
			});

			setCrateList(cratesWithoutAlbum);
		} catch (error) {
			if (error.response.data === "authorize on spotify") {
				navigate("/authorize");
			}
		}
	}

	async function addAlbumToCrate(crate_id) {
		try {
			await axios.post(
				`${baseUrl}/crates/${crate_id}`,
				{
					album_id: albumToAdd.id,
				},
				generateAuthHeader(token)
			);

			setCrateList((prev) => {
				return prev.filter((crate) => {
					return crate.id !== crate_id;
				});
			});
		} catch (error) {
			if (error.response.data === "authorize on spotify") {
				navigate("/authorize");
			}
		}
	}

	useEffect(() => {
		getUserCrateNames();
	}, []);

	if (!crateList) {
		return <>loading...</>;
	}

	return (
		<div className='add-to-crates-modal'>
			<div className='add-to-crates-modal__card'>
				<div className='add-to-crates-modal__close-container'>
					<Icon type='close' height='20' handleClose={toggleAddMode} />
				</div>
				<h2 className='add-to-crates-modal__header'>
					Add{" "}
					<span className='add-to-crates-modal__album-name'>
						{albumToAdd.name}
					</span>{" "}
					to crates:
				</h2>
				<div className='add-to-crates-modal__crates'>
					<ItemList
						itemList={crateList}
						type='crate'
						context='add-to-crates'
						addAlbumToCrate={addAlbumToCrate}
					/>
				</div>
				<button
					onClick={toggleAddMode}
					className='add-to-crates-modal__close-button'
				>
					close
				</button>
			</div>
		</div>
	);
}

export default AddToCratesModal;
