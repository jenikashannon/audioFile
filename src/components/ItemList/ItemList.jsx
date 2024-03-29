// components
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
	deleteAlbum,
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
						{type === "crate" && context !== "search" && (
							<ItemCrate
								crate={item}
								togglePin={togglePin}
								deleteCrate={deleteCrate}
								context={context}
								addAlbumToCrate={addAlbumToCrate}
							/>
						)}

						{type === "crate" && context === "search" && (
							<ItemSearchedCrate
								crate={item}
								togglePin={togglePin}
								deleteCrate={deleteCrate}
								context={context}
								addAlbumToCrate={addAlbumToCrate}
							/>
						)}

						{type === "album" && (
							<ItemAlbum
								album={item}
								context={context}
								deleteAlbum={deleteAlbum}
								viewAlbum={viewAlbum}
								addAlbum={addAlbum}
								albumIds={albumIds}
								editMode={editMode}
								removeAlbum={removeAlbum}
								toggleAddMode={toggleAddMode}
							/>
						)}
					</div>
				);
			})}
		</section>
	);
}

export default ItemList;
