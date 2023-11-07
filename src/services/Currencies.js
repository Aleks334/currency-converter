import { BASE_URL } from "../utils/baseUrl";

export async function fetchAllCurrencies() {
	return fetch(`${BASE_URL}/codes`)
		.then((res) => res.json())
		.then((data) => {
			return data.supported_codes.reduce(
				(prev, curr) => [...prev, { code: curr[0], name: curr[1] }],
				[]
			);
		})
		.catch((error) => console.error(error));
}
