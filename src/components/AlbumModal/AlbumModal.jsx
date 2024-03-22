import "./AlbumModal.scss";

function AlbumModal({ album }) {
	return (
		<article className='album-modal'>
			<div className='album-modal__card'>
				<img
					className='album-modal__image'
					src={album.image}
					alt={`${album.name} cover art`}
				/>
			</div>
		</article>
	);
}

export default AlbumModal;
