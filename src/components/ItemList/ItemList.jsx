// components
import Item from "../Item/Item";
import ItemCrate from "../ItemCrate/ItemCrate";
import ItemSearchedCrate from "../ItemSearchedCrate/ItemSearchedCrate";

// libraries
import { useEffect } from "react";

function ItemList({
	setActiveAlbum,
	addAlbum,
	albumIds,
	editMode,
	setDeletedAlbumIds,
	deletedAlbumIds,
	addAlbumToCrate,
	togglePin,
	deleteCrate,
	toggleAddMode,
	itemList,
	type,
}) {
	// re-render list whenever album is added
	useEffect(() => {}, [albumIds, itemList]);

	return (
		<section className='item-list'>
			{itemList.length === 0 && type === "album" && <p>no albums yet.</p>}
			{itemList.map((item) => {
				return (
					<div key={item.id}>
						{type === "crate" && (
							<ItemCrate
								crate={item}
								togglePin={togglePin}
								deleteCrate={deleteCrate}
							/>
						)}
						{/* {type !== "crate-result" && (
							<Item
								item={item}
								type={type}
								setActiveAlbum={setActiveAlbum}
								addAlbum={addAlbum}
								albumIds={albumIds}
								editMode={editMode}
								setDeletedAlbumIds={setDeletedAlbumIds}
								deletedAlbumIds={deletedAlbumIds}
								togglePin={togglePin}
								toggleAddMode={toggleAddMode}
								addAlbumToCrate={addAlbumToCrate}
							/>
						)} */}
						{/* {type === "crate-result" && (
							<ItemSearchedCrate
								item={item}
								type={type}
								togglePin={togglePin}
							/>
						)} */}
					</div>
				);
			})}
		</section>
	);
}

export default ItemList;
