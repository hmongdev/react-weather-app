import './App.css';
import Inputs from './components/Inputs';
import CityButtons from './components/CityButtons';
import TimeLocation from './components/TimeLocation';
import TempDetails from './components/TempDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useState, useEffect } from 'react';

export default function App() {
    const [query, setQuery] = useState({ q: 'new york' });
    const [units, setUnits] = useState({ units: 'imperial' });
    const [weather, setWeather] = useState(null);

    //see what's inside weather => coming from our api
    console.log(weather);

    useEffect(() => {
        //on load, fetch weather data
        const fetchWeather = async () => {
            await getFormattedWeatherData({ ...query, units }).then((data) => {
                setWeather(data);
            });
        };
        fetchWeather();
        //every time query or units change, fetch new data
    }, [query, units]);

    return (
        <div className="mx-auto py-10 px-32 bg-gradient-to-br from-cyan-500 to to-blue-900 h-fit shadow-xl shadow-gray-400">
            <CityButtons />
            <Inputs />
            {weather && (
                <>
                    <TimeLocation weather={weather} />
                    <TempDetails weather={weather} />
                    <Forecast title="hourly forecast" items={weather.hourly} />
                    <Forecast title="daily forecast" items={weather.daily} />
                </>
            )}
        </div>
    );
}
