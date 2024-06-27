function generateAuthHeader(token, type) {
	if (type === "form") {
		return {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		};
	} else {
		return {
			headers: { Authorization: `Bearer ${token}` },
		};
	}
}

export { generateAuthHeader };
