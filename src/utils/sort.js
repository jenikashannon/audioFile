function sortList(list, sortBy) {
	if (typeof list[0][sortBy] === "string") {
		return list.sort((a, b) => {
			return a[sortBy].localeCompare(b[sortBy]);
		});
	} else if (sortBy === "artists") {
		return list.sort((a, b) => {
			return a[sortBy][0].localeCompare(b[sortBy][0]);
		});
	} else {
		return list.sort((a, b) => a[sortBy] - b[sortBy]);
	}
}

export { sortList };
