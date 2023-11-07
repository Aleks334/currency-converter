import { useEffect, useState } from "react";

import "./App.css";

import {
	CurrencySelect,
	ExchangeRate,
	ConverterInput,
	Footer,
	SwapCurrenciesBtn,
	ActivityIndicator,
} from "./components";

import { BASE_URL } from "./utils/baseUrl";
import { fetchAllCurrencies, fetchLatestConversions, fetchCurrenciesPair } from "./services";

function App() {
	const [currencies, setCurrencies] = useState([]);
	const [amount, setAmount] = useState(1);
	const [fromCurrency, setFromCurrency] = useState();
	const [toCurrency, setToCurrency] = useState();
	const [exchangeRate, setExchangeRate] = useState(0);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function init() {
			const currencies = await fetchAllCurrencies();
			setCurrencies(currencies);

			const latestConversions = await fetchLatestConversions();

			const rates = latestConversions.conversion_rates;
			const baseCurrency = latestConversions.base_code;

			const firstCurr = Object.keys(rates)[0];
			setFromCurrency(baseCurrency);
			setToCurrency(firstCurr);
			setExchangeRate(rates[firstCurr]);
		}

		try {
			setIsLoading(true);
			init();
		} catch (error) {
			alert("Unexpected error occured. Please try again.");
			console.error("Unexpected error during data fetching: " + error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const fetchNewCurrencies = async (from, to) => {
		if (from == null || to == null) {
			console.error("from and to currencies are null!");
			return;
		}
		try {
			setIsLoading(true);
			await fetchCurrenciesPair(from, to).then((rate) => {
				setExchangeRate(rate);
				console.log("exchange rate: " + exchangeRate);
			});
		} catch (error) {
			alert("Unexpected error occured. Please try again.");
			console.error("Unexpected error during data fetching: " + error);
		} finally {
			setIsLoading(false);
		}
	};

	/*useEffect(() => {
		if (fromCurrency == null || toCurrency == null) return;

		fetch(`${BASE_URL}/pair/${fromCurrency}/${toCurrency}`)
			.then((res) => res.json())
			.then((data) => setExchangeRate(data.conversion_rate));
	}, [fromCurrency, toCurrency]);*/

	function handleCurrenciesAmountChange(e) {
		const result = e.target.value;
		setAmount(Number(result));
	}

	function handleSwapCurrencies() {
		const temp = fromCurrency;
		setFromCurrency(toCurrency);
		setToCurrency(temp);
	}

	function handleFromCurrencyChange(e) {
		const value = e.target.value;
		setFromCurrency(value);
		console.log("handle. from: " + fromCurrency + ". To: " + toCurrency);
		fetchNewCurrencies(fromCurrency, toCurrency);
	}

	function handleToCurrencyChange(e) {
		const value = e.target.value;
		setToCurrency(value);
		console.log("handle. from: " + fromCurrency + ". To: " + toCurrency);
		fetchNewCurrencies(fromCurrency, toCurrency);
	}

	return (
		<>
			<ActivityIndicator isLoading={isLoading} />

			<header>
				<h1 className="main-heading">Simple Currency Converter</h1>
			</header>

			<main className="main-content">
				<section className="currency-converter">
					<ExchangeRate
						rate={exchangeRate}
						amount={amount}
					/>

					<form action="#">
						<ConverterInput
							value={amount}
							onChangeAmount={handleCurrenciesAmountChange}
						/>

						<div className="currencies">
							<CurrencySelect
								label="From"
								currencies={currencies}
								currentCurrency={fromCurrency}
								onChange={handleFromCurrencyChange}
							/>

							<SwapCurrenciesBtn handleOnClick={handleSwapCurrencies} />

							<CurrencySelect
								label="To"
								currencies={currencies}
								currentCurrency={toCurrency}
								onChange={handleToCurrencyChange}
							/>
						</div>
					</form>
				</section>
			</main>

			<Footer />
		</>
	);
}

export default App;
