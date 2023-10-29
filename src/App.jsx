import "./App.css";
import CurrencySelect from "./components/CurrencySelect";
import SwapIcon from "./assets/swap-icon.png";
import { useEffect, useState } from "react";

const BASE_URL = `https://v6.exchangerate-api.com/v6/${
  import.meta.env.VITE_API_KEY
}`;

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/codes`)
      .then((res) => res.json())
      .then((data) =>
        setCurrencies(
          data.supported_codes.reduce(
            (prev, curr) => [
              ...prev,
              { code: curr[0], name: curr[1] },
            ],
            []
          )
        )
      )
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <header>
        <h1 className="main-heading">1Simple Currency Converter</h1>
      </header>

      <main className="main-content">
        <section className="currency-converter">
          <div className="center-vertical">
            <h2 className="rate-heading">Exchange Rate</h2>
            <p className="rate-result">$27.77</p>
          </div>

          <form>
            <label className="label" htmlFor="amount">
              Amount
            </label>
            <input type="number" className="input" id="amount" />
            <div className="currencies">
              <CurrencySelect label="From" currencies={currencies} />
              <button className="btn btn--image" type="button">
                <img src={SwapIcon} alt="Swap currencies" />
              </button>
              <CurrencySelect label="To" currencies={currencies} />
            </div>
            <button className="btn btn--blue">Convert</button>
          </form>
        </section>
      </main>

      <footer className="main-footer">
        <p className="current-date">Sunday, 29.10.2023 19:30</p>
      </footer>
    </>
  );
}

export default App;
