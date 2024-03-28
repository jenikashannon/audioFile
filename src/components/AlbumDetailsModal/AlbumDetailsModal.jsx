import "./AlbumDetailsModal.scss";

// components
import Divider from "../Divider/Divider";
import Icon from "../Icon/Icon";

function AlbumDetailsModal({ album, setActiveAlbum }) {
	const regex = /\(fea.*/;
	const duration = `${Math.round(album.duration_ms / 60000)} minutes`;
	const count = album.tracks.length;

	function handleClose() {
		setActiveAlbum(null);
	}

	return (
		<article className='album-details-modal'>
			<div className='album-details-modal__card album-details-modal__card--long'>
				<Icon type='close' height='20' handleClose={handleClose} />
				<img
					className='album-details-modal__image'
					src={album.image}
					alt={`${album.name} cover art`}
				/>
				<p className='album-details-modal__name'>{album.name}</p>
				<p className='album-details-modal__metadata'>
					{`${album.release_date} · ${count} songs · ${duration}`}
				</p>
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
				<Divider />
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
		</article>
	);
}

export default AlbumDetailsModal;
