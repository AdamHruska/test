import axios from "axios";

export default defineNuxtPlugin(() => {
	const api = axios.create({
		baseURL: "https://svet-dveri-reklamacie.webpreview.sk/api/",
		headers: {
			"Content-Type": "application/json",
		},
	});

	return {
		provide: {
			api,
		},
	};
});
