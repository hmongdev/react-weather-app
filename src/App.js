import './App.css';
import Inputs from './Components/Inputs';
import CityButtons from './Components/CityButtons';
import TimeLocation from './Components/TimeLocation';
import TempDetails from './Components/TempDetails';
import Forecast from './Components/Forecast';
import getFormattedWeatherData from './Services/weatherService';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    const [query, setQuery] = useState({ q: 'minneapolis' });
    const [units, setUnits] = useState({ units: 'imperial' });
    const [weather, setWeather] = useState(null);

    //see what's inside weather => coming from our api
    console.log(weather);

    useEffect(() => {
        //on load, fetch weather data
        const fetchWeather = async () => {
            //toastify FETCH
            const message = query.q ? query.q : 'current location.';
            toast.info(`Fetching weather for ${message}`);

            //getWeather
            await getFormattedWeatherData({ ...query, units }).then((data) => {
                //toastify SUCCESS
                toast.success(
                    `Successfully fetched weather for ${data.name}, ${data.country}`
                );
                setWeather(data);
            });
        };
        fetchWeather();
        //every time query or units change, fetch new data
    }, [query, units]);

    //conditional background based on weather temperature
    const formatBackground = () => {
        //standard background
        if (!weather) return 'from-cyan-500 to to-blue-900';
        const threshold = units === 'metric' ? 20 : 60;
        //if weather is cold...
        if (weather.temp <= threshold) return 'from-cyan-500 to to-blue-900';
        //else weather is warm...
        return 'from-yellow-700 to to-orange-700';
    };

    return (
        <div
            className={`mx-auto py-10 px-10 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
        >
            <CityButtons setQuery={setQuery} />
            <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
            {weather && (
                <>
                    <TimeLocation weather={weather} />
                    <TempDetails weather={weather} />
                    <Forecast title="hourly forecast" items={weather.hourly} />
                    <Forecast title="daily forecast" items={weather.daily} />
                </>
            )}
            <ToastContainer
                autoClose={5000}
                theme="colored"
                newestOnTop={true}
            />
        </div>
    );
}
