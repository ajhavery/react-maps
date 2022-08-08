import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

const Search = ({ panTo }) => {
  const {
    ready, // ready: ready to use the Places Autocomplete service
    value, // value: the value of the input typed by user
    setValue, // setValue: set the value of the input
    suggestions: { status, data }, // suggestions: the suggestions returned by the Places Autocomplete service
    clearSuggestions, // clearSuggestions: clear the suggestions returned by the Places Autocomplete service
  } = usePlacesAutocomplete({
    requestOptions: {
      // prefer locations near below lat/long while searching
      location: { lat: () => 28.7041, lng: () => 77.1025 },
      radius: 200 * 1000, // 200km around preferred location
    },
  });

  return (
    <div className='absolute top-4 left-1/2 w-[24rem] z-20'>
      <div className='relative'>
        {/* input box to take search input */}
        {/* value, setValue and ready states are from usePlacesAutocomplete hook */}
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder='Search for places...'
          className='bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500 w-full'
        />
        {/* if suggestions status = 'OK' then show suggestions else show nothing */}
        {status === 'OK' && data.length > 0 && (
          <ul className='absolute top-10 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-2'>
            {data.map((suggestion) => {
              // each suggestion is an object with 'description' and 'placeId' properties
              // description: the text of the suggestion
              const {
                id,
                description,
                structured_formatting: { main_text, secondary_text },
              } = suggestion;

              return (
                <li
                  key={id}
                  onClick={async () => {
                    setValue(description, false);
                    // converts address to lat long using geocoding API
                    const results = await getGeocode({ address: main_text });
                    // console.log('address', results[0]);
                    const { lat, lng } = getLatLng(results[0]);
                    panTo({ lat, lng }); // focussed on lat long
                    clearSuggestions(); // clear suggestions to remove dropdown
                  }}
                  className=' cursor-pointer px-4 py-2 hover:bg-gray-100'
                >
                  <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
