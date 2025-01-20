import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mockData from '../data/mockData.json';
import { CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Star, Comment, StarBorder, StarHalf } from '@mui/icons-material'; // Import icons


const RoomDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const roomDetail = mockData.rooms.find(room => room.id === parseInt(id));
      setRoom(roomDetail);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
         <CircularProgress sx={{ color: 'orange' }} />
      </div>
    );
  }

  if (!room) {
    return <div className="flex justify-center items-center h-screen">Room not found</div>;
  }

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      {/* Room Image */}
      <div className="relative mb-6">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-[400px] object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Room Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className='max-w-screen-md'>
          <h1 className="text-[40px] font-bold text-gray-800">{room.name}</h1>
          <div className='flex items-center gap-[20px]'>
          <div className="flex items-center text-yellow-400 mt-2">
            {Array.from({ length: 5 }).map((_, index) => {
              // Check for full star, half star, or empty star
              if (index < Math.floor(room.rating)) {
                return <Star key={index} className="text-yellow-400" />;
              } else if (index === Math.floor(room.rating) && room.rating % 1 >= 0.5) {
                return <StarHalf key={index} className="text-yellow-400" />;
              } else {
                return <StarBorder key={index} className="text-yellow-400" />;
              }
            })}
            <span className="ml-2">{room.rating}</span>
          </div>

          {/* Comments */}
          <div className="flex items-center text-gray-500 mt-2">
            <Comment fontSize="small" className="mr-2" />
            <span>{room.comments.length} reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-center text-gray-500 mt-2">
            <span>${room.price} per hour</span>
          </div>
          </div>
          
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link to="/reservation" className="inline-block mt-4">
            <Button variant="contained" color="primary" size="large">
              Reserve Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Comments Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Guest Reviews</h2>
      <ul className="space-y-4">
        {room.comments.map((comment, index) => (
          <li key={index} className="border-b pb-4">
            <strong className="font-semibold">{comment.user}</strong>
            <p className="text-gray-600">{comment.comment}</p>
            <div className="flex items-center text-yellow-400 mt-1">
              <span>{comment.rating}</span>
              <span className="ml-1">★</span>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default RoomDetails;
