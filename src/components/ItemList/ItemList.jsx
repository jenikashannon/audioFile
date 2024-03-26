// components
import Item from "../Item/Item";

// libraries
import { useEffect } from "react";

function ItemList({
	crateList,
	albumList,
	resultList,
	searchedCrateList,
	setActiveAlbum,
	addAlbum,
	albumIds,
	editMode,
	setDeletedAlbumIds,
	deletedAlbumIds,
	togglePin,
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

	if (searchedCrateList) {
		itemList = searchedCrateList;
		type = "crate-result";
	}

	// re-render list whenever album is added
	useEffect(() => {}, [albumIds]);

	return (
		<section className='item-list'>
			{itemList.length === 0 && type === "album" && <p>no albums yet.</p>}
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
						editMode={editMode}
						setDeletedAlbumIds={setDeletedAlbumIds}
						deletedAlbumIds={deletedAlbumIds}
						togglePin={togglePin}
					/>
				);
			})}
		</section>
	);
}

export default ItemList;
