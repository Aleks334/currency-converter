import React from "react";

export default function CurrencySelect({
  label,
  currencies,
  currentCurrency,
  onChange,
}) {
  return (
    <>
      <label className="label center-vertical">
        {label}
        <select
          className="select"
          value={currentCurrency}
          onChange={onChange}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
