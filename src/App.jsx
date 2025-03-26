import React, { useState, useEffect } from "react";
import Weather from "./Weather";

function App() {
  const [city, setCity] = useState(() => {
    // Инициализируем состояние, загружая последний город из localStorage, если он есть
    return localStorage.getItem("lastCity") || "Kyiv";
  });

  useEffect(() => {
    localStorage.setItem("lastCity", city);
  }, [city]);

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Введите город"
      />
      <Weather city={city} />
    </div>
  );
}

export default App;
