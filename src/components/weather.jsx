import React, { useState, useEffect } from 'react'
import './weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const allIcons = {
  "01d": clear_icon,
  "01n": clear_icon,
  "02d": cloud_icon,
  "02n": cloud_icon,
  "03d": cloud_icon,
  "03n": cloud_icon,
  "04d": drizzle_icon,
  "04n": drizzle_icon,
  "09d": rain_icon,
  "09n": rain_icon,
  "10d": rain_icon,
  "10n": rain_icon,
  "13d": snow_icon,
  "13n": snow_icon,
}

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [city, setCity] = useState('Kabul')

  const fetchWeather = async (cityName) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url)
      const data = await response.json()

      if (data.cod === 200) {
        const icon = allIcons[data.weather[0].icon] || clear_icon
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        })
      } else {
        alert("City not found!")
        setWeatherData(null)
      }
    } catch (error) {
      console.error("Error fetching weather:", error)
      alert("Failed to fetch weather data")
      setWeatherData(null)
    }
  }

  useEffect(() => {
    fetchWeather(city)
  }, [])

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeather(city.trim())
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search City'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <img src={search_icon} alt='Search' onClick={handleSearch} style={{cursor: 'pointer'}} />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt='Weather Icon' className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>

          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt='Humidity' />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className='col'>
              <img src={wind_icon} alt='Wind Speed' />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  )
}

export default Weather