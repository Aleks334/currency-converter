import React from "react";

export default function ActivityIndicator({ isLoading }) {
	return (
		<div
			className={isLoading ? "loader" : "loader hide"}
			aria-label="Fetching data. Please wait."
		>
			<div className="acivity-indicator"></div>
		</div>
	);
}
