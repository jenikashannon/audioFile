// components
import Item from "../Item/Item";

function ItemList({ crateList, albumList, setActiveAlbum, resultList }) {
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
		type = "album-list";
	}

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
					/>
				);
			})}
		</section>
	);
}

export default ItemList;
