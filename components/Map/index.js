import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

const getInfoWindowString = (place) => `
    <div>
      <div style="font-weight: bold">
        ${place.name}
      </div>
      <div>
        ${place.address}
      </div>
    </div>`;

const handleApiLoaded = (map, maps, places) => {
  const markers = [];
  const infowindows = [];

  places.forEach((place) => {
    markers.push(new maps.Marker({
      position: {
        lat: place.latitude,
        lng: place.longitude,
      },
      map,
    }));

    infowindows.push(new maps.InfoWindow({
      content: getInfoWindowString(place),
    }));
  });

  markers.forEach((marker, i) => {
    marker.addListener('click', () => {
      infowindows[i].open(map, marker);
    });
  });
};

const Wrapper = styled.main`
  width: 100%;
  height: 500px;
`;

const Map = ({ children, ...props }) => (
  <Wrapper>
    <GoogleMapReact
      // for testing purpose only, add this API key in a environment variable
      defaultZoom={6}
      bootstrapURLKeys={{
        key: 'AIzaSyDs7RrfV4rRk26YtCFDgH0AxM-OP3T_GQI',
      }}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, props.places)}
      {...props}
    >
      {children}
    </GoogleMapReact>
    {props.places.map((e, index) => (
        <div key={index}>
            <div>
              <span>Name: {e.name}</span><br/>
              <span>Address: {e.address}</span><br/>
              <span>Distance: </span>
            </div>
        </div>
      ))}
  </Wrapper>
);

Map.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Map.defaultProps = {
  children: null,
};

export default Map;