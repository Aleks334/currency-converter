import { useEffect, useState } from "react";

import "./App.css";

import CurrencySelect from "./components/CurrencySelect";
import ExchangeRate from "./components/ExchangeRate";
import ConverterInput from "./components/ConverterInput";
import Footer from "./components/Footer";

import SwapIcon from "./assets/swap-icon.png";

const BASE_URL = `https://v6.exchangerate-api.com/v6/${
  import.meta.env.VITE_API_KEY
}`;

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(0);

  console.log("exchange rate: " + exchangeRate);

  useEffect(() => {
    fetch(`${BASE_URL}/latest/EUR`)
      .then((res) => res.json())
      .then((data) => {
        const firstCurr = Object.keys(data.conversion_rates)[0];
        setCurrencies(Object.keys(data.conversion_rates));
        setFromCurrency(data.base_code);
        setToCurrency(firstCurr);
        setExchangeRate(data.conversion_rates[firstCurr]);
      })
      .catch((error) => console.error(error));
  }, []);

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
              <button className="btn btn--image" type="button">
                <img src={SwapIcon} alt="Swap currencies" />
              </button>
              <CurrencySelect
                label="To"
                currencies={currencies}
                currentCurrency={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              />
            </div>

            <button className="btn btn--blue">Convert</button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
