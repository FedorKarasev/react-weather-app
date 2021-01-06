import React, {useState, useEffect} from 'react';
import Notification from './Notification'
import './App.css';

function App() {

  const KELVIN = 273;

  const [weatherValue, setWeatherValue] = useState('-');
  const [weatherValueFarenheit, setWeatherValueFarenheit] = useState('-');
  const [weatherUnits, setWeatherUnits] = useState('celsius');
  const [weatherDescription, setWeatherDescription] = useState('-');
  const [weatherIcon, setWeatherIcon] = useState('icons/unknown.png');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [location, setLocation] = useState('-');
  const [geolocationPromlem, setGeolocationProblem] = useState(false);

  const apiKey = '5131f785595a7dbb2e5f721c00417bf6';

  function getWeatherInfo(latitude, longitude) {

    let apiURI = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(apiURI)
    .then(data => {
      return data.json()
    })
    .then(data => {
      setWeatherValue(Math.floor(data.main.temp) - KELVIN);
      setWeatherDescription(data.weather[0].description);
      setWeatherIcon('icons/' + data.weather[0].icon + '.png');
      setCity(data.name);
      setCountry(data.sys.country);
      setLocation(`${city}, ${country}`);
    })
  }

  function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeatherInfo(latitude, longitude);
  }

  function showError() {
    setGeolocationProblem(true);
  }

  function toggleWeatherUnits() {
    if (weatherUnits === 'celsius') {
      setWeatherValueFarenheit(Math.floor(weatherValue * 9 / 5) + 32);
      setWeatherUnits('farenheit');
    } else if (weatherUnits === 'farenheit') {
      setWeatherValue(weatherValue);
      setWeatherUnits('celsius');
    } else {
      return;
    }
  }

  useEffect(() => {

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(setPosition, showError)
    }

  }, []);

  return (
    <div class="container">
        <div class="app-title">
            <p>Weather</p>
        </div>
        <Notification geolocationPromlem={geolocationPromlem} />
        <div class="weather-container">
            <div class="weather-icon">
                <img src={weatherIcon} alt="" />
            </div>
            <div onClick={toggleWeatherUnits} class="temperature-value">
                {weatherUnits === 'celsius' ? <p>{weatherValue} °<span>C</span></p> : <p>{weatherValueFarenheit} °<span>F</span></p>
                }
            </div>
            <div class="temperature-description">
                <p>{weatherDescription}</p>
            </div>
            <div class="location">
                <p>{location}</p>
            </div>
        </div>
    </div>
  );
}

export default App;
