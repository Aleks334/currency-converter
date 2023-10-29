import React from "react";
import SwapIcon from "../assets/swap-icon.png";

export default function SwapCurrenciesBtn({ handleOnClick }) {
  return (
    <button
      className="btn btn--image"
      type="button"
      onClick={handleOnClick}
    >
      <img src={SwapIcon} alt="Swap currencies" />
    </button>
  );
}
