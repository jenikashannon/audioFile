function generateAuthHeader(token) {
	return {
		headers: { Authorization: `Bearer ${token}` },
	};
}

export { generateAuthHeader };
