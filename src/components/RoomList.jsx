import { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

const RoomList = () => {
  const { filteredRooms } = useOutletContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Game Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-[20px] cursor-pointer">
        {loading
          ? [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="border-solid border-[1px] border-[#eae8e8] rounded-[20px] shadow-md overflow-hidden relative group"
              >
                <Skeleton
                  variant="rectangular"
                  height={350}
                  className="w-full"
                />
                <div className="absolute inset-0 bg-white bg-opacity-10"></div>
                <div className="absolute inset-0 p-4 flex flex-col rounded-[20px] justify-between text-white">
                  <Skeleton
                    variant="text"
                    width="50%"
                    height={60}
                    className="rounded-full"
                  />
                  <div className="flex flex-col ">
                    <Skeleton
                      variant="text"
                      width="50%"
                      height={30}
                      className="rounded-[20px]"
                    />
                    <Skeleton
                      variant="text"
                      width="40%"
                      height={30}
                      className="rounded-[20px]"
                    />
                    <Skeleton variant="text" width="30%" height={30} />
                  </div>
                </div>
              </div>
            ))
          : filteredRooms.map((room) => (
              <Link to={`/rooms/${room.id}`} key={room.id}>
                <div
                  key={room.id}
                  className="border-solid border-[1px] border-[#eae8e8] rounded-[20px] shadow-md overflow-hidden relative group transition-all duration-500"
                >
                  {/* Image with Overlay */}
                  <img
                    src={room.image}
                    srcSet={`${room.image} 480w, ${room.image} 768w, ${room.image} 1200w`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt={`${room.name} Image`}
                    loading="lazy"
                    width="600"
                    height="400"
                    className="w-full h-[350px] object-cover opacity-90 transition-transform duration-500 group-hover:scale-110"
                  />

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
                      <p className="text-sm text-gray-300 mb-4 max-w-[300px]">
                        {room.description.length > 70
                          ? `${room.description.slice(0, 70)}...`
                          : room.description}
                      </p>
                      <div className="text-lg font-bold mb-2">$20 per hour</div>
                      <button className="text-orange-400 hover:underline">
                        More
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default RoomList;
