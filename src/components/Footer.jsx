import React, { useEffect, useState } from "react";

export default function Footer() {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		setInterval(() => setDate(new Date()), 1000);
	}, []);

	return (
		<footer className="main-footer">
			<p className="current-date">
				{date.toLocaleDateString("pl-PL", {
					day: "numeric",
					month: "numeric",
					year: "numeric",
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
				})}
			</p>
		</footer>
	);
}
