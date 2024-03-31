import "./ItemList.scss";

// components
import ItemAlbum from "../ItemAlbum/ItemAlbum";
import ItemCrate from "../ItemCrate/ItemCrate";
import ItemCrateSearched from "../ItemCrateSearched/ItemCrateSearched";

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
	saveAlbum,
	viewAlbum,
	toggleAddMode,
	itemList,
	type,
	context,
}) {
	// re-render list whenever album is added
	useEffect(() => {}, [albumIds, itemList]);

	return (
		<section
			className={context === "pinned" ? "item-list__pinned" : "item-list"}
		>
			{itemList.map((item) => {
				return (
					<div
						key={item.id}
						className={
							context === "pinned" ? "item-list__pinned--container" : ""
						}
					>
						{type === "crate" &&
							["crates-page", "add-to-crates", "pinned"].includes(context) && (
								<ItemCrate
									crate={item}
									context={context}
									togglePin={togglePin}
									deleteCrate={deleteCrate}
									addAlbumToCrate={addAlbumToCrate}
								/>
							)}

						{type === "crate" && context === "search" && (
							<ItemCrateSearched
								crate={item}
								togglePin={togglePin}
								deleteCrate={deleteCrate}
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
								saveAlbum={saveAlbum}
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
