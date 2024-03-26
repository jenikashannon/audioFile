// components
import Item from "../Item/Item";
import ItemSearchedCrate from "../ItemSearchedCrate/ItemSearchedCrate";

// libraries
import { useEffect } from "react";

function ItemList({
	crateList,
	albumList,
	resultList,
	discoverList,
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

	if (discoverList) {
		itemList = discoverList;
		type = "album-discover-result";
	}

	// re-render list whenever album is added
	useEffect(() => {}, [albumIds, searchedCrateList]);

	return (
		<section className='item-list'>
			{itemList.length === 0 && type === "album" && <p>no albums yet.</p>}
			{itemList.map((item) => {
				return (
					<>
						{type !== "crate-result" && (
							<Item
								key={item.id}
								item={item}
								type={type}
								setActiveAlbum={setActiveAlbum}
								addAlbum={addAlbum}
								albumIds={albumIds}
								editMode={editMode}
								setDeletedAlbumIds={setDeletedAlbumIds}
								deletedAlbumIds={deletedAlbumIds}
								togglePin={togglePin}
							/>
						)}
						{type === "crate-result" && (
							<ItemSearchedCrate
								key={item.id}
								item={item}
								type={type}
								togglePin={togglePin}
							/>
						)}
					</>
				);
			})}
		</section>
	);
}

export default ItemList;
