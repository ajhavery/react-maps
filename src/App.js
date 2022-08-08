import { useState, useCallback, useRef } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import mapStyles from './map-styles';
import Search from './Search';
import LocateUser from './LocateUser';

/**************** MAP VARIABLES *************/

// declare outside to prevent too many re renders
const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
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

/**************** MAP CODE STARTS *************/

const App = () => {
  // load script hook - loads the google maps script and libraries using API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  // marker state
  const [markers, setMarkers] = useState([]);
  // selected marker state
  const [selected, setSelected] = useState(null);

  // onMapClick will only change if dependencies change
  const onMapClick = useCallback(
    (event) => {
      setMarkers([
        ...markers,
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date(),
        },
      ]);
    },
    [markers]
  );

  // setting map ref on load
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // pan to the location entered by user
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';
  return (
    <div className='w-full h-screen relative'>
      <Search panTo={panTo} />
      <LocateUser panTo={panTo} />
      <div className='w-[50rem] h-[30rem] mx-auto mt-10 border'>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.time.toISOString()}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: '/location.png',
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0), // marker appears at the center of the image
                anchor: new window.google.maps.Point(15, 15), // marker appears at the center of the image
              }}
              onClick={() => setSelected(marker)}
            />
          ))}

          {selected && (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <h2>{formatRelative(selected.time, new Date())}</h2>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default App;
