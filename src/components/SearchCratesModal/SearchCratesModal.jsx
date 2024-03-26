import "./SearchCratesModal.scss";

// components
import ItemList from "../ItemList/ItemList";

function SearchCratesModal({ searchedCrateList, setSearchMode, setTerm }) {
	function closeModal() {
		setSearchMode(false);
		setTerm("");
	}

	return (
		<article className='search-crates-modal'>
			<h1 className='search-crates-modal__title'>crate results</h1>
			<div className='search-crates-modal__results'>
				<ItemList searchedCrateList={searchedCrateList} />
			</div>
			<button className='search-crates-modal__close' onClick={closeModal}>
				cancel
			</button>
		</article>
	);
}

export default SearchCratesModal;
