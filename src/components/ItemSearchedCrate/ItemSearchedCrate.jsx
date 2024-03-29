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

	const crateNameMatch = crate.matches.filter((match) => {
		return match.key === "name";
	})[0];

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

	function highlightMatchText(match, textType, album) {
		const refs = album
			? {
					"albums.name": album.name,
					"albums.tracks.name": match.value,
					"albums.artists": album.artists.join(", "),
			  }
			: null;

		if (!match) {
			return crate.name;
		}

		if (textType !== match.key) {
			return <>{refs[textType]}</>;
		}

		const stringStart = match.value.slice(0, match.indices[0][0]);
		const stringHighlight = match.value.slice(
			match.indices[0][0],
			match.indices[0][1] + 1
		);
		const stringEnd = match.value.slice(match.indices[0][1] + 1);

		return (
			<>
				{stringStart}
				<span className='item-searched-crate__highlight'>
					{stringHighlight}
				</span>
				{stringEnd}
			</>
		);
	}

	return (
		<article
			className='item-searched-crate'
			onClick={() => {
				navigate(`/crates/${crate.id}`);
			}}
		>
			<h2 className='item-searched-crate__name'>
				{highlightMatchText(crateNameMatch, "name")}
			</h2>
			<p className='item-searched-crate__title'>top matches:</p>

			<div className='item-searched-crate__container'>
				{uniqueMatches.map((match) => {
					const matchType = match.key;

					// find relevant album for match
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
									{highlightMatchText(match, "albums.name", album)} ·{" "}
									{highlightMatchText(match, "albums.artists", album)}
								</p>
								{matchType === "albums.tracks.name" && (
									<div className='item-searched-crate__container--track'>
										<Icon type='tracks' height='12' fill='0' />
										<p className='item-searched-crate__track-name'>
											{highlightMatchText(match, "albums.tracks.name", album)}
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
