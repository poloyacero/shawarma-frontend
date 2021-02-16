import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

const Wrapper = styled.main`
  width: 100%;
  height: 500px;
`;

const Map = ({ children, ...props }) => (
  <Wrapper>
    <GoogleMapReact
      // for testing purpose only, add this API key in a environment variable
      bootstrapURLKeys={{
        key: process.env.MAP_API_KEY,
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
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