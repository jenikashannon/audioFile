import "./CrateDetailsPage.scss";

// components
import Header from "../../components/Header/Header";

// libraries
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function CrateDetailsPage() {
	const crate_id = useParams().crate_id;

	async function getCrateDetails() {
		try {
			const response = await axios.get();
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<main className='crate-details-page'>
			<Header text={crate_id} />
		</main>
	);
}

export default CrateDetailsPage;
