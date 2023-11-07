import { BASE_URL } from "../utils/baseUrl";

export async function fetchCurrenciesPair(fromCurrency, toCurrency) {
	return fetch(`${BASE_URL}/pair/${fromCurrency}/${toCurrency}`)
		.then((res) => res.json())
		.then((data) => data.conversion_rate)
		.catch((error) => console.error(error));
}
