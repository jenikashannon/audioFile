function sortList(list, sortBy, orderBy) {
	let sortedList;

	if (typeof list[0][sortBy] === "string") {
		sortedList = list.sort((a, b) => {
			return a[sortBy].localeCompare(b[sortBy]);
		});
	} else if (sortBy === "artists") {
		sortedList = list.sort((a, b) => {
			return a[sortBy][0].localeCompare(b[sortBy][0]);
		});
	} else {
		sortedList = list.sort((a, b) => a[sortBy] - b[sortBy]);
	}

	if (orderBy === "desc") {
		return sortedList.reverse();
	}

	return sortedList;
}

const sortsAlbum = [
	{ sortBy: "", label: "date added" },
	{ sortBy: "name", label: "album name" },
	{ sortBy: "artists", label: "artist" },
	{ sortBy: "release_date", label: "release date" },
	{ sortBy: "duration_ms", label: "duration" },
];

const sortsCrate = [
	{ sortBy: "", label: "date added" },
	{ sortBy: "name", label: "crate name" },
];

export { sortList, sortsAlbum, sortsCrate };
