import "./AddToCratesModal.scss";

// components
import ItemList from "../ItemList/ItemList";

function AddToCratesModal({ crateList, addAlbumToCrate }) {
	return (
		<div className='add-to-crates-modal'>
			<div className='add-to-crates-modal__card'>
				<h2>Add "insert album name" to crates:</h2>
				<div className='add-to-crates-modal__crates'>
					<ItemList
						itemList={crateList}
						type='crate-add'
						addAlbumToCrate={addAlbumToCrate}
					/>
				</div>
			</div>
		</div>
	);
}

export default AddToCratesModal;
