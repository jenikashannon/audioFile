import "./AlbumModal.scss";

// components
import Divider from "../Divider/Divider";

function AlbumModal({ album, setActiveAlbum }) {
	const regex = /\(fea.*/;

	function handleClose() {
		setActiveAlbum(null);
	}

	return (
		<article className='album-modal'>
			<div className='album-modal__card'>
				<div className='album-modal__container album-modal__container--close'>
					<svg
						className='album-modal__close-button'
						onClick={handleClose}
						xmlns='http://www.w3.org/2000/svg'
						height='24'
						viewBox='0 -960 960 960'
						width='24'
					>
						<path d='m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z' />
					</svg>
				</div>
				<img
					className='album-modal__image'
					src={album.image}
					alt={`${album.name} cover art`}
				/>
				<div className='album-modal__table-header'>
					<div className='album-modal__row'>
						<p className='album-modal__column--num album-modal__heading'>#</p>
						<div className='album-modal__container'>
							<p className='album-modal__column album-modal__heading'>title</p>
							<p className='album-modal__column album-modal__heading'>
								artists
							</p>
						</div>
					</div>
				</div>
				<Divider />
				<div className='album-modal__tracks'>
					{album.tracks.map((track, index) => {
						return (
							<div
								className={`album-modal__row ${
									index === 0 ? "album-modal__row--first" : ""
								}`}
							>
								<p className='album-modal__column--num album-modal__detail'>
									{index + 1}
								</p>
								<div className='album-modal__container'>
									<p className='album-modal__column album-modal__detail'>
										{track.name.replace(regex, "")}
									</p>
									<p className='album-modal__column album-modal__detail'>
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

export default AlbumModal;
