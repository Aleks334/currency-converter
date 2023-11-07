import { BASE_URL } from "../utils/baseUrl";

export async function fetchLatestConversions() {
	return fetch(`${BASE_URL}/latest/EUR`)
		.then((res) => res.json())
		.then((data) => data)
		.catch((error) => console.error(error));
}
