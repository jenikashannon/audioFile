import "./CratesPage.scss";
import { baseUrl } from "../../utils/consts";

// components
import Header from "../../components/Header/Header";
import ItemList from "../../components/ItemList/ItemList";

// libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CratesPage() {
	const [crateList, setCrateList] = useState(null);
	const [defaultCrate, setDefaultCrate] = useState(false);

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
		}
	}, [crateList]);

	if (!crateList) {
		return <>Loading...</>;
	}

	return (
		<main className='crates-page'>
			<Header text='my crates' />
			<div className='crates-page__container'>
				<ItemList crateList={crateList} />
				{defaultCrate ? (
					<p className='crates-page__default-text'>
						We've created your first crate for you, just click the edit icon to
						make it your own.
					</p>
				) : null}
			</div>
		</main>
	);
}

export default CratesPage;
