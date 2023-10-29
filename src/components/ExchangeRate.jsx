import React from "react";

export default function ExchangeRate({ rate }) {
  return (
    <div className="center-vertical">
      <h2 className="rate-heading">Exchange rate</h2>
      <p className="rate-result">{rate}</p>
    </div>
  );
}
