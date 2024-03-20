import "./ItemList.scss";

// components
import Item from "../Item/Item";

function ItemList({ crateList }) {
	let itemList;
	let type;

	if (crateList) {
		itemList = crateList;
		type = "crate";
	}

	return (
		<section>
			{itemList.map((item) => {
				return <Item key={item.id} item={item} type={type} />;
			})}
		</section>
	);
}

export default ItemList;
