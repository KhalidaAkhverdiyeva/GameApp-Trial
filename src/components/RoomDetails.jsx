import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mockData from '../data/mockData.json';
import { CircularProgress, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { Star, Comment, StarBorder, StarHalf } from '@mui/icons-material'; // Import icons


const RoomDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState('');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const savedData = JSON.parse (localStorage.getItem('rooms')) || mockData.rooms;
      const roomDetail = savedData.find(room => room.id === parseInt(id));
      setRoom(roomDetail);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReview && newRating) {
      const updatedRoom= {
        ...room,
        comments: [
          ...room.comments,
          {
            user: "User",
            comment: newReview,
            rating: newRating,
          }
        ]
      }
      setRoom(updatedRoom);
      const savedData = JSON.parse(localStorage.getItem('rooms')) || mockData.rooms;
      const updatedData = savedData.map((room) => room.id === parseInt(id) ? updatedRoom : room);
      localStorage.setItem('rooms', JSON.stringify(updatedData));
      setNewReview('');
      setNewRating('');
    }
  };
  


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
    <div className="p-4 max-w-screen-lg mx-auto">
      {/* Room Image */}
      <div className="relative mb-6">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-[400px] object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Room Info */}
      <div className="flex flex-col   justify-between mb-6">
        <div className='max-w-screen-md'>
          <h1 className="text-[40px] font-bold text-gray-800">{room.name}</h1>
          <div className='flex items-center gap-[20px]'>
          <div className="flex items-center text-yellow-400 mt-2">
            {Array.from({ length: 5 }).map((_, index) => {
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
        <p className='text-[18px] text-gray-500 py-3'>{room.description}</p>
        
        <div className="mt-4 md:mt-0">
          <Link to="/reservation" className="inline-block mt-4">
           <button className='bg-orange-500 text-white px-[20px] py-[15px] rounded-[20px]'>Reserve Now</button>
          </Link>
        </div>
      </div>

      {/* Comments Section */}
     
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Guest Reviews</h2>

{/* Form to Add a Review */}
<div className="mb-8">
  <form onSubmit={handleAddReview} className="bg-white shadow-md rounded-lg p-4">
    <textarea
      placeholder="Write your review..."
      value={newReview}
      onChange={(e) => setNewReview(e.target.value)}
      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
      rows="4"
    ></textarea>
    <div className="flex items-center justify-between mt-3">
    <div className="flex items-center">
      <label htmlFor="rating" className="mr-4 text-gray-700">Rating:</label>
      <Rating
        name="rating"
        value={newRating}
        onChange={(e, value) => setNewRating(value)} // `value` contains the selected rating
        precision={1} // Allows selecting whole numbers only
        size="large"
      />
    </div>
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
      >
        Submit Review
      </button>
    </div>
  </form>
</div>

{/* Display Existing Reviews */}
      <ul className="space-y-6">
        {room.comments.map((comment, index) => (
          <li key={index} className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <strong className="font-semibold text-gray-800">{comment.user}</strong>
              <div className="flex items-center text-yellow-400">
                <span className="font-semibold">{comment.rating}</span>
                <span className="ml-1">★</span>
              </div>
            </div>
            <p className="text-gray-600 mt-2">{comment.comment}</p>
          </li>
        ))}
      </ul>


    </div>
  );
};

export default RoomDetails;
