import "./ItemSearchedCrate.scss";

// components
import Icon from "../Icon/Icon";

// libraries
import { useNavigate } from "react-router-dom";

function ItemSearchedCrate({ item, type, togglePin }) {
	const navigate = useNavigate();

	const matchTypes = ["albums", "tracks", "artists"];

	return (
		<article
			className='item-searched-crate'
			onClick={() => {
				navigate(`/crates/${item.id}`);
			}}
		>
			<h2 className='item-searched-crate__name'>{item.name}</h2>
			<p className='item-searched-crate__title'>top matches:</p>
			{matchTypes.map((matchType) => {
				const matches = item.matches
					.filter((match) => {
						return match.key === matchType;
					})
					.map((match) => {
						return match.value;
					})
					.splice(0, 3)
					.join(" · ");

				if (matches.length === 0) {
					return;
				}

				return (
					<div key={matchType} className='item-searched-crate__container'>
						<Icon type={matchType} height='16' width='16' fill='0' />
						<p className='item-searched-crate__matches'>{matches}</p>
					</div>
				);
			})}
		</article>
	);
}

export default ItemSearchedCrate;
