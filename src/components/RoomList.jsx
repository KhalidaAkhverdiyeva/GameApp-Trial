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
          <div key={room.id} className="border rounded-lg shadow-lg overflow-hidden relative">
            {/* Image */}
            <img
              src={room.image}
              alt={`${room.name} Image`}
              className="w-full h-64 object-cover" 
            />

            <div className="p-4 flex flex-col justify-between h-full">
              {/* Room Name and Rating */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{room.name}</h2>
                <div className="flex items-center text-yellow-500">
                  <span>{room.rating}</span>
                  <span className="ml-1">★</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-2">{room.description}</p>

              <div className="mt-auto">
                {/* Price */}
                <div className="text-lg font-bold mb-2">$20 per hour</div>
                
                {/* More Button */}
                <Link to={`/rooms/${room.id}`} className="text-orange-500 hover:underline">
                  More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
