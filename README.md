# React Google Maps demo

## Tutorial Followed: https://www.youtube.com/watch?v=WZcxJGmLbSo

## Project Steps

1. Save Google maps API key in .env.local
2. Enable 2 APIs:
   1. Maps Javascript API
   2. Places API
3. NPM packages installed:
   1. npm i @react-google-maps/api
   2. npm i date-fns
   3. npm i use-places-autocomplete
4. Get map styles from https://snazzymaps.com/style/1243 and apply
5. To enable click detection on maps UI
   1. Save click position in state
   2. Render state position using markers
   3. Define onMapClick function in useCallback
   4. Add Markets with custom icon to render based on markers array state
   5. Show Info window on Marker click
6. Add Google places search

   1. use-places-autocomplete package will be used
   2. Search component will use google's geocode API and will locate area on map from address

   ```javascript
   {
     status === 'OK' && data.length > 0 && (
       <ul className='absolute top-10 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-2'>
         {data.map((suggestion) => {
           // each suggestion is an object with 'description' and 'placeId' properties
           const {
             id,
             structured_formatting: { main_text, secondary_text },
           } = suggestion;

           return (
             <li
               key={id}
               onClick={(e) => {
                 setValue(main_text);
                 getGeocode({ address: main_text });
                 getLatLng({ address: main_text });
                 clearSuggestions();
               }}
               className=' cursor-pointer px-4 py-2 hover:bg-gray-100'
             >
               <strong>{main_text}</strong> <small>{secondary_text}</small>
             </li>
           );
         })}
       </ul>
     );
   }
   ```

   3. LocateUser component will use browser's data to locate user on the map
