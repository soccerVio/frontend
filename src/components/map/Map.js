import React, { useCallback } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import './Map.css'

const Map = ({ latitude, longitude, mapClick, forSearch }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const markerClick = useCallback((e) => {
    console.log(e.latLng.lat());
    console.log(e.latLng.lng());
  }, []);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          zoom={10}
          center={{ lat: latitude, lng: longitude }}
          mapContainerClassName={"map-container"}
          onClick={(e) => mapClick(e.latLng.lat(), e.latLng.lng())}
        >
          <MarkerF
            position={{ lat: latitude, lng: longitude }}
            icon={{
              url: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png",
              fillColor: "blue",
              fillOpacity: 1,
            }}
          />
          {forSearch && (
            <>
              <MarkerF
                position={{ lat: latitude + 0.01, lng: longitude + 0.01 }}
                clickable
                onClick={markerClick}
                icon={{
                  path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
                  fillColor: "blue",
                  fillOpacity: 1,
                }}
              />
              <MarkerF
                position={{ lat: latitude - 0.01, lng: longitude - 0.01 }}
                clickable
                onClick={markerClick}
                icon={{
                  path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
                  fillColor: "blue",
                  fillOpacity: 1,
                }}
              />
              <MarkerF
                position={{ lat: latitude + 0.01, lng: longitude - 0.01 }}
                clickable
                onClick={markerClick}
                icon={{
                  path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
                  fillColor: "blue",
                  fillOpacity: 1,
                }}
              />
              <MarkerF
                position={{ lat: latitude - 0.01, lng: longitude + 0.01 }}
                clickable
                onClick={markerClick}
                icon={{
                  path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
                  fillColor: "blue",
                  fillOpacity: 1,
                }}
              />
              <MarkerF
                position={{ lat: latitude + 0.005, lng: longitude + 0.005 }}
                clickable
                onClick={markerClick}
                icon={{
                  path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
                  fillColor: "blue",
                  fillOpacity: 1,
                }}
              />
            </>
          )}
        </GoogleMap>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Map;
