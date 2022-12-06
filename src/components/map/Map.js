import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const Map = ({ terrain, setTerrain }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          zoom={10}
          center={{ lat: terrain.latitude, lng: terrain.longitude }}
          mapContainerClassName="map-container"
          onClick={(e) => {
            setTerrain({
              ...terrain,
              latitude: e.latLng.lat(),
              longitude: e.latLng.lng(),
            });
          }}
        >
          <MarkerF
            position={{ lat: terrain.latitude, lng: terrain.longitude }}
          />
        </GoogleMap>
      ) : (
        "Loading"
      )}
    </>
  );
};

export default Map;
