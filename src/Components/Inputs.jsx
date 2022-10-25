import React from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';

function Inputs() {
    return (
        <div className="flex flex-row justify-center my-6">
            <div className="flex flex-row items-center justify-center space-x-4">
                <div className="flex flex-row w-1/4 items-center justify-center">
                    <button
                        name="metric"
                        className="text-white text-2xl mx-1 hover:opacity-20"
                    >
                        °C
                    </button>
                    <p className="text-white text-2xl mx-1">|</p>
                    <button
                        name="imperial"
                        className="text-white text-2xl mx-1 hover:opacity-20"
                    >
                        °F
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Search City"
                    className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize rounded-xl"
                />
                <button>
                    <UilSearch
                        size={30}
                        className="text-white cursor-pointer transition ease-out hover:scale-125"
                    />
                </button>
                <button>
                    <UilLocationPoint
                        size={30}
                        className="text-white cursor-pointer transition ease-out hover:scale-125"
                    />
                </button>
            </div>
        </div>
    );
}

export default Inputs;
