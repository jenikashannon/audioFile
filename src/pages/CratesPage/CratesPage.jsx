import "./CratesPage.scss";
import { baseUrl } from "../../utils/consts";

// components
import ItemList from "../../components/ItemList/ItemList";

// libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CratesPage() {
	const [crateList, setCrateList] = useState(null);
	const [defaultCrate, setDefaultCrate] = useState(null);

	const user_id = localStorage.getItem("audioFileId");

	const navigate = useNavigate();

	async function getUserCrates() {
		try {
			const response = await axios.get(`${baseUrl}/crates/${user_id}`);
			setCrateList(response.data);
			setDefaultCrate(response.data[0].default_crate);
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

	if (!crateList) {
		return <>Loading...</>;
	}

	return (
		<main className='crates-page'>
			<h1 className='crates-page__title'>my crates</h1>
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
