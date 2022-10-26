import './App.css';
// import UilReact from '@iconscout/react-unicons/icons/uil-react';
import Inputs from './components/Inputs';
import CityButtons from './components/CityButtons';
import TimeLocation from './components/TimeLocation';
import TempDetails from './components/TempDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';

export default function App() {
    const fetchWeather = async () => {
        const data = await getFormattedWeatherData({
            q: 'minneapolis',
            // units: 'imperial',
        });
        console.log(data);
    };

    fetchWeather();

    return (
        <div className="mx-auto py-10 px-32 bg-gradient-to-br from-cyan-500 to to-blue-900 h-fit shadow-xl shadow-gray-400">
            <CityButtons />
            <Inputs />
            <TimeLocation />
            <TempDetails />
            <Forecast title="hourly forecast" />
            <Forecast title="daily forecast" />
        </div>
    );
}
