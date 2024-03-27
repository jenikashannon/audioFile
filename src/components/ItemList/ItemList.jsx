// components
import Item from "../Item/Item";
import ItemAlbum from "../ItemAlbum/ItemAlbum";
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
	removeAlbum,
	viewAlbum,
	toggleAddMode,
	itemList,
	type,
	context,
}) {
	// re-render list whenever album is added
	useEffect(() => {}, [albumIds, itemList]);

	return (
		<section className='item-list'>
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

						{type === "album" && (
							<ItemAlbum
								album={item}
								context={context}
								removeAlbum={removeAlbum}
								viewAlbum={viewAlbum}
								addAlbum={addAlbum}
								albumIds={albumIds}
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
