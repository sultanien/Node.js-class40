import express from "express";
import fetch from "node-fetch";
import keys from "./sources/keys.js";

const app = express();
const OW_API_KEY = keys.API_KEY;

// Body Parser MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Sets a basic route
app.get("/", (req, res) => res.send("Hello from backend to frontend!"));

//Sets post route
app.post("/weather", async (req, res) => {
  const city = req.body.city;
  if (!city) {
    return res.status(400).json({ msg: "Please enter a city" });
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OW_API_KEY}`
    );
    const data = await response.json();
    const weatherKelvin = data.main.temp;
    const weatherCelsius = KelvinToCelsius(weatherKelvin);

    res.json({ weatherText: `${city} is ${weatherCelsius}°C` });
  } catch (error) {
    res.status(400).json({ Error: error.message});
  }
});

export function KelvinToCelsius(kelvin) {
  const KelvinToCel = kelvin - 272.15;
  return KelvinToCel.toFixed(2);
}

export default app;
