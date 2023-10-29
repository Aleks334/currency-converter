import React from "react";

export default function ExchangeRate({ rate, amount }) {
  return (
    <div className="center-vertical">
      <h2 className="rate-heading">Exchange rate</h2>
      <p className="rate-result">{(rate * amount).toFixed(3)}</p>
    </div>
  );
}
