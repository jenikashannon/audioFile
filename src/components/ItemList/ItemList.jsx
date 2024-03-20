// components
import Item from "../Item/Item";

function ItemList({ crateList }) {
	let itemList;
	let type;
	let mode;

	if (crateList) {
		itemList = crateList;
		type = "crate";
	}

	return (
		<section className='item-list'>
			{itemList.map((item) => {
				return <Item key={item.id} item={item} type={type} mode={mode} />;
			})}
		</section>
	);
}

export default ItemList;
