import './App.css';
// import UilReact from '@iconscout/react-unicons/icons/uil-react';
import Inputs from './Components/Inputs';
import CityButtons from './Components/CityButtons';
import TimeLocation from './Components/TimeLocation';
import TempDetails from './Components/TempDetails';

export default function App() {
    return (
        <div className="mx-auto py-10 px-32 bg-gradient-to-br from-cyan-500 to to-blue-900 h-fit shadow-xl shadow-gray-400">
            <CityButtons />
            <Inputs />
            <TimeLocation />
            <TempDetails />
        </div>
    );
}
