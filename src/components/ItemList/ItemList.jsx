// components
import Item from "../Item/Item";

// libraries
import { useState, useEffect } from "react";

function ItemList({
	crateList,
	albumList,
	setActiveAlbum,
	resultList,
	addAlbum,
	albumIds,
	editMode,
	removeAlbum,
}) {
	const [sortBy, setSortBy] = useState("release_date");
	const [sortedItemList, setSortedItemList] = useState(null);

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

	// name, artist, duration, release year

	function sortList() {
		if (sortBy) {
			if (typeof itemList[0][sortBy] === "string") {
				setSortedItemList(
					itemList.sort((a, b) => {
						return a[sortBy].localeCompare(b[sortBy]);
					})
				);
			} else if (sortBy === "artists") {
				setSortedItemList(
					itemList.sort((a, b) => {
						return a[sortBy][0].localeCompare(b[sortBy][0]);
					})
				);
			} else {
				setSortedItemList(itemList.sort((a, b) => a[sortBy] - b[sortBy]));
			}
		}
	}

	useEffect(() => {
		sortList();
	}, []);

	// re-render list whenever album is added
	useEffect(() => {}, [albumIds]);

	if (!sortedItemList) {
		return <>Load..</>;
	}

	return (
		<section className='item-list'>
			{itemList.length === 0 && type === "album" && (
				<p>no albums yet. click the edit icon to add records to your crate.</p>
			)}
			{sortedItemList.map((item) => {
				return (
					<Item
						key={item.id}
						item={item}
						type={type}
						mode={mode}
						setActiveAlbum={setActiveAlbum}
						addAlbum={addAlbum}
						albumIds={albumIds}
						editMode={editMode}
						removeAlbum={removeAlbum}
					/>
				);
			})}
		</section>
	);
}

export default ItemList;
