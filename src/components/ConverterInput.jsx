import React from "react";

export default function ConverterInput({ value, onChange }) {
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
        onChange={onChange}
        maxLength={12}
      />
    </>
  );
}
