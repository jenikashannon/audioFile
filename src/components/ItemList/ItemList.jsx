// components
import Item from "../Item/Item";

// libraries
import { useEffect } from "react";

function ItemList({
	crateList,
	albumList,
	setActiveAlbum,
	resultList,
	addAlbum,
	albumIds,
}) {
	let itemList;
	let type;
	let mode;

	if (crateList) {
		itemList = crateList;
		type = "crate";
	}

	if (albumList) {
		itemList = albumList;
		type = "album";
	}

	if (resultList) {
		itemList = resultList;
		type = "album-result";
	}

	useEffect(() => {}, [albumIds]);

	return (
		<section className='item-list'>
			{itemList.length === 0 && type === "album" && (
				<p>no albums yet. click the edit icon to add records to your crate.</p>
			)}
			{itemList.map((item) => {
				return (
					<Item
						key={item.id}
						item={item}
						type={type}
						mode={mode}
						setActiveAlbum={setActiveAlbum}
						addAlbum={addAlbum}
						albumIds={albumIds}
					/>
				);
			})}
		</section>
	);
}

export default ItemList;
