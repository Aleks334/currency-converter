import React from "react";

export default function ConverterInput({ value, onChangeAmount }) {
	return (
		<>
			<label
				className="label"
				htmlFor="amount"
			>
				Amount
			</label>
			<input
				type="number"
				className="input"
				id="amount"
				name="amount"
				value={value}
				onChange={onChangeAmount}
				step={0.01}
				min={1}
			/>
		</>
	);
}
