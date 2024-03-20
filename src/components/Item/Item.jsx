import "./Item.scss";
import { baseUrl } from "../../utils/consts";

// libraries
import { Link } from "react-router-dom";

function Item({ item, type }) {
	const user_id = localStorage.getItem("audioFileId");
	console.log(item);
	return (
		<Link to={`/crates/${user_id}/${item.id}`}>
			<img src={item.cover_art} />
			<div>
				<p>{item.name}</p>
				<p>{item.album_count}</p>
			</div>
		</Link>
	);
}

export default Item;
