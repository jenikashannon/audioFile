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

	const user_id = localStorage.getItem("audioFileId");

	const navigate = useNavigate();

	async function getUserCrates() {
		try {
			const response = await axios.get(`${baseUrl}/crates/${user_id}`);
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

	if (!crateList) {
		return <>Loading...</>;
	}

	return (
		<main className='crates-page'>
			<h1 className='crates-page__title'>My crates</h1>
			<div className='crates-page__container'>
				<ItemList crateList={crateList} />
			</div>
		</main>
	);
}

export default CratesPage;
