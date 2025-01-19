import React, { useState } from 'react';

const ReservationModal = ({ isOpen, onClose, onReserve }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  if (!isOpen) return null;

  const handleReserve = () => {
    onReserve(date, time);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl mb-2">Make a Reservation</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-1 mb-2"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-1 mb-2"
        />
        <button onClick={handleReserve} className="bg-blue-500 text-white p-2 rounded">
          Reserve
        </button>
        <button onClick={onClose} className="ml-2 p-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReservationModal; 