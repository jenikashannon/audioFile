import "./CrateDetailsPage.scss";
import { baseUrl } from "../../utils/consts";

// components
import Header from "../../components/Header/Header";
import ItemList from "../../components/ItemList/ItemList";

// libraries
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function CrateDetailsPage() {
	const [crate, setCrate] = useState(null);

	const crate_id = useParams().crate_id;
	const user_id = localStorage.getItem("audioFileId");

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

	useEffect(() => {
		getCrateDetails();
	}, []);

	if (!crate) {
		return <>Loading...</>;
	}

	return (
		<main className='crate-details-page'>
			<Header text={crate.name} />
			<div className='crate-details-page__container'>
				<ItemList albumList={crate.albums} />
			</div>
		</main>
	);
}

export default CrateDetailsPage;
