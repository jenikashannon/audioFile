import axios from "axios";
import { baseUrl } from "./consts";
import { generateAuthHeader } from "./generateAuthHeader";

import { AppLauncher } from "@capacitor/app-launcher";

const token = localStorage.getItem("token");

async function triggerPlayback(albums) {
	const uris = getAlbumUris(albums);

	try {
		await axios.put(
			`${baseUrl}/spotify/play`,
			{
				uris,
			},
			generateAuthHeader(token)
		);
	} catch (error) {
		console.log(error.response.data);
	}
}

async function openSpotify() {
	const { completed } = await AppLauncher.openUrl({ url: "spotify://" });
	return completed;
}

function getAlbumUris(albums) {
	let uris = [];

	albums.forEach((album) => {
		const albumUris = album.tracks.map((track) => {
			return track.uri;
		});

		uris = uris.concat(albumUris);
	});

	return uris;
}

function shuffleAlbums(albums) {
	let shuffledAlbums = [];
}

export { openSpotify, triggerPlayback };
