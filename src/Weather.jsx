import React, { useState, useEffect } from "react";

function Weather({ city }) {
  // Состояния: данные погоды, индикатор загрузки и ошибка
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Задайте ваш API-ключ (замените 'YOUR_API_KEY' на реальный ключ)
    const apiKey = "YOUR_API_KEY";
    // Функция для получения данных о погоде
    const fetchWeather = async () => {
      setLoading(true);
      try {
        // Формируем URL запроса: указываем город, единицы измерения и API-ключ
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        if (!res.ok) {
          throw new Error("Город не найден");
        }
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Вызываем функцию получения погоды при первом рендере и при изменении города
    fetchWeather();
  }, [city]);

  // Условный рендеринг: показываем сообщение о загрузке или ошибке, если они есть
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  // Если данные успешно загружены, отображаем прогноз погоды
  return (
    <div className="weather">
      <h2>Погода в {weather.name}</h2>
      <p>🌡️ Температура: {weather.main.temp} °C</p>
      <p>📖 Погода: {weather.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
    </div>
  );
}

export default Weather;
