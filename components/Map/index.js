import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import currentLocation from '../../hooks/currentLocation';
import watchLocation from '../../hooks/watchLocation';
import Marker from '../Marker'
import styles from '../../styles/Home.module.css'

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

  for(const place of places) {
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
  };

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

const Map = ({ children, ...props }) => {

  return (
    <Wrapper>
      <GoogleMapReact
        // for testing purpose only, add this API key in a environment variable
        defaultZoom={6}
        bootstrapURLKeys={{
          key: '',
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, props.places)}
        {...props}
      >

        {children}
      </GoogleMapReact>
      {props.places.map((e, index) => (
          <div key={index}>
            <div className={styles.card} style={{cursor: 'pointer'}} onClick={() => {console.log('test')}}>
              <span>Name: {e.name}</span><br/>
              <span>Address: {e.address}</span><br/>
            </div>
          </div>
        ))}
    </Wrapper>
  );
}

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