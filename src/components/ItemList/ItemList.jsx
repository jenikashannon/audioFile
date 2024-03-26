// components
import Item from "../Item/Item";
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
								toggleAddMode={toggleAddMode}
								addAlbumToCrate={addAlbumToCrate}
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
