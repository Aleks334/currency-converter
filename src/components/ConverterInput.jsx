import React from "react";

export default function ConverterInput({ value, onChangeAmount }) {
  return (
    <>
      <label className="label" htmlFor="amount">
        Amount
      </label>
      <input
        type="text"
        className="input"
        id="amount"
        name="amount"
        value={value}
        onChange={onChangeAmount}
        maxLength={9}
      />
    </>
  );
}
