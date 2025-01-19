import React from 'react';
import { useParams } from 'react-router-dom';
import mockData from '../data/mockData.json';

const RoomDetails = () => {
  const { id } = useParams();
  const room = mockData.rooms.find(room => room.id === parseInt(id));

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{room.name}</h1>
      <p>{room.description}</p>
      <p>Rating: {room.rating}</p>
      <h2 className="text-xl mt-4">Comments</h2>
      <ul>
        {room.comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.user}:</strong> {comment.comment} (Rating: {comment.rating})
          </li>
        ))}
      </ul>
      {/* Add ReservationModal and CommentForm components here */}
    </div>
  );
};

export default RoomDetails; 