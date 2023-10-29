import React from "react";

export default function Footer() {
  const date = new Date();

  return (
    <footer className="main-footer">
      <p className="current-date">
        {date.toLocaleDateString("pl-PL", {
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
