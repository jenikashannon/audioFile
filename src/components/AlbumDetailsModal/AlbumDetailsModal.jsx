import "./AlbumDetailsModal.scss";
import { baseUrl } from "../../utils/consts";
import { generateAuthHeader } from "../../utils/generateAuthHeader";
import { triggerPlayback, openSpotify } from "../../utils/getAlbumUris";

// components
import Divider from "../Divider/Divider";
import Icon from "../Icon/Icon";

// libraries
import { useEffect, useState } from "react";

function AlbumDetailsModal({ album, setActiveAlbum }) {
	const [isSpotifyOpened, setIsSpotifyOpened] = useState(false);

	const regex = /\(fea.*/;
	const duration = `${Math.round(album.duration_ms / 60000)} minutes`;
	const count = album.tracks.length;

	function handleClose() {
		setActiveAlbum(null);
	}

	async function handleClick() {
		const response = await openSpotify();
		setIsSpotifyOpened(response);
	}

	useEffect(() => {
		if (isSpotifyOpened) {
			triggerPlayback([album]);
			setActiveAlbum(null);
		}
	}, [isSpotifyOpened]);

	return (
		<div className='album-details-modal'>
			<article
				className='album-details-modal__background'
				onClick={handleClose}
			></article>
			<div className='album-details-modal__card album-details-modal__card--long'>
				<div className='album-details-modal__close-container'>
					<Icon type='close' height='20' handleClose={handleClose} />
				</div>
				<img
					className='album-details-modal__image'
					src={album.image}
					alt={`${album.name} cover art`}
				/>
				<p className='album-details-modal__name'>{album.name}</p>
				<p className='album-details-modal__metadata'>
					{`${album.release_date} · ${count} songs · ${duration}`}
				</p>
				<button onClick={handleClick}>play on Spotify</button>
				<div className='album-details-modal__table-header'>
					<div className='album-details-modal__row'>
						<p className='album-details-modal__column--num album-details-modal__heading'>
							#
						</p>
						<div className='album-details-modal__container'>
							<p className='album-details-modal__column album-details-modal__heading'>
								title
							</p>
							<p className='album-details-modal__column album-details-modal__heading'>
								artists
							</p>
						</div>
					</div>
				</div>
				<Divider margin='0' />
				<div className='album-details-modal__tracks'>
					{album.tracks.map((track, index) => {
						return (
							<div
								key={track.name}
								className={`album-details-modal__row ${
									index === 0 ? "album-details-modal__row--first" : ""
								}`}
							>
								<p className='album-details-modal__column--num album-details-modal__detail'>
									{index + 1}
								</p>
								<div className='album-details-modal__container'>
									<p className='album-details-modal__column album-details-modal__detail'>
										{track.name.replace(regex, "")}
									</p>
									<p className='album-details-modal__column album-details-modal__detail'>
										{track.artists.join(", ")}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default AlbumDetailsModal;
