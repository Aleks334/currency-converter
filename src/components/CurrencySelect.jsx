import React from "react";

export default function CurrencySelect({ label, currencies }) {
  return (
    <>
      <label className="label center-vertical">
        {label}
        <select className="select">
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
