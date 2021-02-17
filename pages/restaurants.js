import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Map from '../components/Map';

export default function Restaurants({ restaurants }) {
  return (
    <div>
      <Map
        defaultZoom={11}
        defaultCenter={[25.204849, 55.270782]}
        places={restaurants}
      />
    </div>
  );
}

Restaurants.getInitialProps = async () => {
  const response = await axios.get('http://localhost:5000/api/v1/restaurants');
  const restaurantsList = response.data;
  return { restaurants: restaurantsList.data };
}