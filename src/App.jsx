import React, { useState, useEffect } from 'react';
import Figure from './Component/Figure';

const NASA_URL = "https://api.nasa.gov/planetary/apod";
const NASA_API_KEY = "DEMO_KEY"; // Reemplaza con tu propia clave API

function App() {
  const [date, setDate] = useState('');
  const [nasaData, setNasaData] = useState(null);

  // Inicializa la fecha actual y hace la primera llamada a la API
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []);

  // Llamada a la API cada vez que cambia la fecha
  useEffect(() => {
    const fetchNasaData = async () => {
      try {
        const url = `${NASA_URL}?date=${date}&api_key=${NASA_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        setNasaData(data);
      } catch (error) {
        console.error("Error fetching data from NASA API:", error);
      }
    };

    if (date) {
      fetchNasaData();
    }
  }, [date]);

  // Maneja el cambio de fecha en el input
  const handleInput = (ev) => {
    setDate(ev.target.value);
  };

  return (
    <div className="App">
      <h1>Imagen astronómica del día</h1>
      <p>Esta imagen corresponde con la fecha {date}</p>
      
      <label htmlFor="date-input">Selecciona una fecha:</label>
      <input
        type="date"
        id="date-input"
        value={date}
        onChange={handleInput}
      />

      {nasaData && (
        <Figure
          url={nasaData.url}
          title={nasaData.title}
          date={nasaData.date}
          copyright={nasaData.copyright}
          explanation={nasaData.explanation}
        />
      )}
    </div>
  );
}

export default App;
