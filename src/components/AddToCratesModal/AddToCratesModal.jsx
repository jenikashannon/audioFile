import "./AddToCratesModal.scss";

// components
import Icon from "../Icon/Icon";
import ItemList from "../ItemList/ItemList";

function AddToCratesModal({
	crateList,
	albumToAdd,
	addAlbumToCrate,
	toggleAddMode,
}) {
	return (
		<div className='add-to-crates-modal'>
			<div className='add-to-crates-modal__card'>
				<div className='add-to-crates-modal__close-container'>
					<Icon type='close' height='20' handleClose={toggleAddMode} />
				</div>
				<h2 className='add-to-crates-modal__header'>
					Add{" "}
					<span className='add-to-crates-modal__album-name'>
						{albumToAdd.name}
					</span>{" "}
					to crates:
				</h2>
				<div className='add-to-crates-modal__crates'>
					<ItemList
						itemList={crateList}
						type='crate'
						context='add-to-crates'
						addAlbumToCrate={addAlbumToCrate}
					/>
				</div>
				<button
					onClick={toggleAddMode}
					className='add-to-crates-modal__close-button'
				>
					close
				</button>
			</div>
		</div>
	);
}

export default AddToCratesModal;
