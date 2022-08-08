import React from 'react';
import { GoLocation } from 'react-icons/go';

const LocateUser = ({ panTo }) => {
  return (
    <div className='absolute top-4 left-1/4 w-[12rem] z-20'>
      <button
        className='bg-white border rounded flex items-center gap-2 px-2 py-1 text-gray-600'
        // navigator.geoLocation takes user's location from the browser
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              panTo({ lat: latitude, lng: longitude });
            },
            (error) => console.log(error)
          );
        }}
      >
        <GoLocation className='text-sm text-rose-600' />
        Locate me
      </button>
    </div>
  );
};

export default LocateUser;
