import "./ItemSearchedCrate.scss";

// components
import Icon from "../Icon/Icon.jsx";

// libraries
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";

function ItemSearchedCrate({ crate, type, togglePin }) {
	const navigate = useNavigate();

	const matches = crate.matches
		.filter((match) => {
			return match.key !== "name";
		})
		.slice(0, 3);

	let previousTrackIndex = 0;

	const trackIndices = crate.albums.map((album) => {
		return (previousTrackIndex += album.tracks.length);
	});

	return (
		<article
			className='item-searched-crate'
			onClick={() => {
				navigate(`/crates/${crate.id}`);
			}}
		>
			<h2 className='item-searched-crate__name'>{crate.name}</h2>
			<p className='item-searched-crate__title'>top matches:</p>

			<div className='item-searched-crate__container'>
				{matches.map((match) => {
					const matchType = match.key;

					let albumIndex;

					if (matchType === "albums.tracks.name") {
						albumIndex = trackIndices.findIndex((trackIndex) => {
							return match.refIndex < trackIndex;
						});
					} else {
						albumIndex = match.refIndex;
					}

					const album = crate.albums[albumIndex];

					return (
						<div
							key={uniqid()}
							className='item-searched-crate__container--match'
						>
							<img
								className='item-searched-crate__album-art'
								src={album.image}
								alt={album.name + "cover art"}
							/>
							<div className='item-searched-crate__container--text'>
								<p className='item-searched-crate__album-name'>
									{album.name} · {album.artists.join(", ")}
								</p>
								{matchType === "albums.tracks.name" && (
									<div className='item-searched-crate__container--track'>
										<Icon type='tracks' height='12' fill='0' />
										<p className='item-searched-crate__track-name'>
											{match.value}
										</p>
									</div>
								)}
							</div>
						</div>
					);
				})}
				<p className='item-searched-crate__matches'>{crate.name}</p>
			</div>
		</article>
	);
}

export default ItemSearchedCrate;
