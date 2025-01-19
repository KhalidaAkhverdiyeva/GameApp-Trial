import { Link } from 'react-router-dom';
import mockData from '../data/mockData.json';
import Header from './Header';

const RoomList = () => {
  return (
    <div className="p-4">
      {/* Header with logo, name, and user icon */}
      <Header />

      {/* Game Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.rooms.map(room => (
          <div key={room.id} className="border rounded-lg shadow-lg overflow-hidden">
            <img
  src={room.image}  
  alt={`${room.name} Image`}
  className="w-full h-48 object-cover"
/>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
              <p className="text-gray-600 mb-2">{room.description}</p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{room.rating}</span>
              </div>
              <div className="text-lg font-bold mb-2">$20 per hour</div> {/* Example price */}
              <Link to={`/rooms/${room.id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList; 