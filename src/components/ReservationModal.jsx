import { useState } from 'react';
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';

const ReservationModal = ({ isOpen, onClose, onReserve }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState(1); 

  if (!isOpen) return null;

  const handleReserve = () => {
    onReserve({ date, time, people });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Make a Reservation</h2>
        <div className="flex items-center border rounded p-2 mb-4">
            <PersonIcon className="text-gray-500 mr-2" />
            <select
              id="people"
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="w-full border-none focus:outline-none"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} People
                </option>
              ))}
            </select>
          </div>
        <div className="mb-4">
         
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
       
        <div className="flex justify-end">
          <button
            onClick={handleReserve}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Reserve
          </button>
          <button
            onClick={onClose}
            className="ml-2 text-gray-700 px-4 py-2 rounded border hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

ReservationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReserve: PropTypes.func.isRequired,
};

export default ReservationModal;


