import { BASE_URL } from "../utils/baseUrl";

export async function fetchCurrenciesPair(fromCurrency, toCurrency) {
	console.log("from: " + fromCurrency + ". To: " + toCurrency);
	return fetch(`${BASE_URL}/pair/${fromCurrency}/${toCurrency}`)
		.then((res) => res.json())
		.then((data) => {
			console.log("data rate: " + data.conversion_rate);
			return data.conversion_rate;
		})
		.catch((error) => console.error(error));
}
