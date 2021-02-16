import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Restaurants({ restaurants }) {
  return (
    <div>
      {restaurants.map((e, index) => (
        <div key={index}>
          <Link as={`/restaurants/${e._id}`} href="/[restaurants]/[id]">
            <a>
              Navigate to {e.name} - {e.address}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

Restaurants.getInitialProps = async () => {
  const response = await axios.get('http://localhost:5000/api/v1/restaurants');
  const restaurantsList = response.data;
  return { restaurants: restaurantsList.data };
}