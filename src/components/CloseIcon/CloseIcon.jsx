import "./CloseIcon.scss";

function CloseIcon({ handleClose }) {
	return (
		<div className='close-icon__container'>
			<svg
				className='close-icon__button'
				onClick={handleClose}
				xmlns='http://www.w3.org/2000/svg'
				height='24'
				viewBox='0 -960 960 960'
				width='24'
			>
				<path d='m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z' />
			</svg>
		</div>
	);
}

export default CloseIcon;
