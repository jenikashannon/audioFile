import "./ItemSearchedCrate.scss";

// components
import Icon from "../Icon/Icon.jsx";

// libraries
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";

function ItemSearchedCrate({ crate, type, togglePin }) {
	const navigate = useNavigate();

	// filter out matches on crate name
	const matches = crate.matches.filter((match) => {
		return match.key !== "name";
	});

	// remove match duplicates
	let matchValues = [];
	let uniqueMatches = [];

	matches.map((match) => {
		if (matchValues.includes(match.value)) {
			if (match.key === "albums.tracks.name") {
				uniqueMatches.splice(
					uniqueMatches.findIndex(
						(uniqueMatch) =>
							uniqueMatch.value === match.value &&
							uniqueMatch.key !== "albums.tracks.name"
					),
					1
				);

				uniqueMatches.push(match);
			}

			return;
		}

		matchValues.push(match.value);
		uniqueMatches.push(match);
	});

	// take top three matches for the crate
	uniqueMatches = uniqueMatches.slice(0, 3);

	// determine track refindices that correspond to each album
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
				{uniqueMatches.map((match) => {
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
			</div>
		</article>
	);
}

export default ItemSearchedCrate;
