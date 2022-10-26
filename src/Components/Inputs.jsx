import React from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';
import { useState } from 'react';

function Inputs({ setQuery, units, setUnits }) {
    const [city, setCity] = useState('');

    const handleCitySearch = () => {
        if (city !== '') setQuery({ q: city });
        setCity('');
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                setQuery({
                    lat,
                    lon,
                });
            });
        }
        setCity('');
    };

    const handleUnitsChange = (e) => {
        const selectedUnit = e.currentTarget.name;
        if (units !== selectedUnit) setUnits(selectedUnit);
    };

    return (
        <div className="flex flex-row justify-center my-6">
            <div className="flex flex-row items-center justify-center space-x-4">
                <div className="flex flex-row w-1/4 items-center justify-center">
                    <button
                        name="metric"
                        className="text-white text-2xl mx-1 transition ease-out hover:scale-125 hover:opacity-50"
                        onClick={handleUnitsChange}
                    >
                        °C
                    </button>
                    <p className="text-white text-2xl mx-1">|</p>
                    <button
                        name="imperial"
                        className="text-white text-2xl mx-1 transition ease-out hover:scale-125 hover:opacity-50"
                        onClick={handleUnitsChange}
                    >
                        °F
                    </button>
                </div>
                <input
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    type="text"
                    placeholder="Search City"
                    className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize rounded-xl"
                />
                <button>
                    <UilSearch
                        onClick={handleCitySearch}
                        size={30}
                        className="text-white cursor-pointer transition ease-out hover:scale-125"
                    />
                </button>
                <button>
                    <UilLocationPoint
                        onClick={handleLocationClick}
                        size={30}
                        className="text-white cursor-pointer transition ease-out hover:scale-125"
                    />
                </button>
            </div>
        </div>
    );
}

export default Inputs;
