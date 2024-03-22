// components
import Item from "../Item/Item";

function ItemList({ crateList, albumList }) {
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

	return (
		<section className='item-list'>
			{itemList.length === 0 && type === "album" && (
				<p>no albums yet. click the edit icon to add records to your crate.</p>
			)}
			{itemList.map((item) => {
				return <Item key={item.id} item={item} type={type} mode={mode} />;
			})}
		</section>
	);
}

export default ItemList;
