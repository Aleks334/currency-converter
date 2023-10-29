import React, { useEffect, useState } from "react";

export default function Footer() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDate(new Date()), 45000);
  }, []);
  return (
    <footer className="main-footer">
      <p className="current-date">
        {date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </p>
    </footer>
  );
}
