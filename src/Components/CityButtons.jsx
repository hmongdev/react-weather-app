import React from 'react';

function CityButtons() {
    const cities = [
        {
            id: 1,
            name: 'Paris',
        },
        {
            id: 2,
            name: 'New York',
        },
        {
            id: 3,
            name: 'London',
        },
        {
            id: 4,
            name: 'Bangkok',
        },
        {
            id: 5,
            name: 'Hong Kong',
        },
        {
            id: 6,
            name: 'Tokyo',
        },
    ];

    return (
        <div className="flex items-center justify-between my-6">
            {cities.map((city) => (
                <button
                    key={city.id}
                    className="text-white text-md font-medium transition ease-out hover:scale-120 hover:text-orange-500"
                >
                    {city.name}
                </button>
            ))}
        </div>
    );
}

export default CityButtons;
