import { Link } from 'react-router-dom';
import mockData from '../data/mockData.json';
import Header from './Header';

const RoomList = () => {
  return (
    <div className="p-4">
      {/* Header with logo, name, and user icon */}
      <Header />

      {/* Game Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockData.rooms.map(room => (
          <div key={room.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
            <p className="mb-2">{room.description}</p>
            <p className="mb-2">Rating: {room.rating}</p>
            <Link to={`/rooms/${room.id}`} className="text-blue-500">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList; 