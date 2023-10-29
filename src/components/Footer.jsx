import React from "react";

export default function Footer() {
  const date = new Date();

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
