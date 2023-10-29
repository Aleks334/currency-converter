import { useEffect, useState } from "react";

import "./App.css";

import CurrencySelect from "./components/CurrencySelect";
import ExchangeRate from "./components/ExchangeRate";
import ConverterInput from "./components/ConverterInput";
import Footer from "./components/Footer";
import SwapCurrenciesBtn from "./components/SwapCurrenciesBtn";

const BASE_URL = `https://v6.exchangerate-api.com/v6/${
  import.meta.env.VITE_API_KEY
}`;

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/codes`)
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(
          data.supported_codes.reduce(
            (prev, curr) => [
              ...prev,
              { code: curr[0], name: curr[1] },
            ],
            []
          )
        );
      });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/latest/EUR`)
      .then((res) => res.json())
      .then((data) => {
        const firstCurr = Object.keys(data.conversion_rates)[0];
        setFromCurrency(data.base_code);
        setToCurrency(firstCurr);
        setExchangeRate(data.conversion_rates[firstCurr]);
      })
      .catch((error) => console.error(error));
  }, [currencies]);

  useEffect(() => {
    if (fromCurrency == null || toCurrency == null) return;

    fetch(`${BASE_URL}/pair/${fromCurrency}/${toCurrency}`)
      .then((res) => res.json())
      .then((data) => setExchangeRate(data.conversion_rate));
  }, [fromCurrency, toCurrency]);

  function handleOnChangeAmount(e) {
    const result = e.target.value.replace(/\D/g, "");
    setAmount(Number(result));
  }

  function handleOnClick() {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }

  return (
    <>
      <header>
        <h1 className="main-heading">Simple Currency Converter</h1>
      </header>

      <main className="main-content">
        <section className="currency-converter">
          <ExchangeRate rate={exchangeRate} amount={amount} />

          <form>
            <ConverterInput
              value={amount}
              onChangeAmount={handleOnChangeAmount}
            />

            <div className="currencies">
              <CurrencySelect
                label="From"
                currencies={currencies}
                currentCurrency={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              />
              <SwapCurrenciesBtn handleOnClick={handleOnClick} />
              <CurrencySelect
                label="To"
                currencies={currencies}
                currentCurrency={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
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
