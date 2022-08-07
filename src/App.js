import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import mapStyles from './map-styles';

/**************** MAP VARIABLES *************/

// declare outside to prevent too many re renders
const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 28.7041,
  lng: 77.1025,
};
// Find map styles on: https://snazzymaps.com/style/8097/wy
const options = {
  styles: mapStyles,
  disableDefaultUI: true, // to remove default map UI controls
  zoomControl: true, // to add zoom control
};

const App = () => {
  // load script hook - loads the google maps script and libraries using API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
      >
        <Marker position={{ lat: 28.7041, lng: 77.1025 }} />
      </GoogleMap>
    </div>
  );
};

export default App;
