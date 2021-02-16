import axios from 'axios';
import { useRouter } from 'next/router';
import Marker from '../../components/Marker';
import Map from '../../components/Map';

export default function Restaurant({ restaurant }) {
  const router = useRouter();
  return (
    <div>
      <Map
        defaultZoom={17}
        defaultCenter={[restaurant.latitude, restaurant.longitude]}
        yesIWantToUseGoogleMapApiInternals
      >
        <Marker
          key={restaurant.address}
          text={restaurant.name}
          lat={restaurant.latitude}
          lng={restaurant.longitude}
        />
      </Map>
    </div>
  );
}

Restaurant.getInitialProps = async (ctx) => {
  const { query } = ctx;
  console.log(query);
  const response = await axios.get('http://localhost:5000/api/v1/restaurants/'+query.id);
  const restaurantsList = response.data;
  return { restaurant: restaurantsList.data };
}