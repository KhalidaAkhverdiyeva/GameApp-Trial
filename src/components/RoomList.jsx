import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mockData from '../data/mockData.json';
import Header from './Header';
import Skeleton from '@mui/material/Skeleton';

const RoomList = () => {
  const [loading, setLoading] = useState(true);
  const [filteredRooms, setFilteredRooms] = useState(mockData.rooms);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = mockData.rooms.filter(room =>
      room.name.toLowerCase().includes(lowerCaseQuery) ||
      room.description.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredRooms(filtered);
  };

  return (
    <div className="p-4">
      {/* Header with logo, name, and user icon */}
      <Header onSearch={handleSearch} />

      {/* Game Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-[20px] cursor-pointer">
        {loading
          ? 
            [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="border-solid border-[1px] border-[#eae8e8] rounded-[20px] shadow-md overflow-hidden relative group"
              >
                <Skeleton variant="rectangular" height={350} className="w-full" />
                <div className="absolute inset-0 bg-white bg-opacity-10"></div>
                <div className="absolute inset-0 p-4 flex flex-col rounded-[20px] justify-between text-white">
                  <Skeleton variant="text" width="50%" height={60} className="rounded-full" />
                  <div className="flex flex-col ">
                  <Skeleton variant="text" width="50%" height={30} className="rounded-[20px]" />
                  <Skeleton variant="text" width="40%" height={30} className="rounded-[20px]" />
                  <Skeleton variant="text" width="30%" height={30} />
                  </div>
                
                </div>
              </div>
            ))
          : filteredRooms.map(room => (
              <div
                key={room.id}
                className="border-solid border-[1px] border-[#eae8e8] rounded-[20px] shadow-md overflow-hidden relative group transition-all duration-500"
              >
                {/* Image with Overlay */}
                <div className="relative">
                  <img
                    src={room.image}
                    alt={`${room.name} Image`}
                    className="w-full h-[350px] object-cover opacity-90 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                </div>

                {/* Text Over the Image */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                  {/* Room Name and Rating */}
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-[30px] font-semibold">{room.name}</h2>
                    <div className="flex items-center text-yellow-400">
                      <span>{room.rating}</span>
                      <span className="ml-1">★</span>
                    </div>
                  </div>

                  {/* Description and Actions */}
                  <div className="mt-auto">
                    <p className="text-sm text-gray-300 mb-4">{room.description}</p>
                    {/* Price */}
                    <div className="text-lg font-bold mb-2">$20 per hour</div>
                    {/* More Button */}
                    <Link to={`/rooms/${room.id}`} className="text-orange-400 hover:underline">
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
