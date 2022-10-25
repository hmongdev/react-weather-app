import React from 'react';

function TimeLocation() {
    // const time = new Date().toLocaleTimeString([], {
    //     hour: '2-digit',
    //     minute: '2-digit',
    // });
    // const date = new Date().getDate();

    return (
        <div>
            <div className="flex items-center justify-center my-6">
                <p className="text-white text-xl font-extralight">
                    Tuesday, Oct 25 2022 | Local Time: 3:36 PM
                </p>
            </div>
            <div className="flex items-center justify-center my-3">
                <p className="text-white text-3xl font-medium">
                    {' '}
                    Minneapolis, MN
                </p>
            </div>
        </div>
    );
}

export default TimeLocation;
