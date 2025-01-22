import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mockData from '../data/mockData.json';
import { CircularProgress, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Star, Comment, StarBorder, StarHalf } from '@mui/icons-material';
import ReservationModal from './ReservationModal';
import LoginModal from './LoginModal';
import ReviewForm from './ReviewForm';

const RoomDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const currentUser = localStorage.getItem('username') || 'User';

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const savedData = JSON.parse(localStorage.getItem('rooms')) || mockData.rooms;
      const roomDetail = savedData.find((room) => room.id === parseInt(id));
      setRoom(roomDetail);
      setLoading(false);
    }, 2000);

    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);

    return () => clearTimeout(timer);
  }, [id]);

  const handleAddReview = (reviewText, rating) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    
    const updatedRoom = {
      ...room,
      comments: [
        ...room.comments,
        {
          user: currentUser,
          comment: reviewText,
          rating: rating,
          date: new Date().toLocaleDateString(),
        },
      ],
    };

    setRoom(updatedRoom);
    const savedData = JSON.parse(localStorage.getItem('rooms')) || mockData.rooms;
    const updatedData = savedData.map((room) =>
      room.id === parseInt(id) ? updatedRoom : room
    );
    localStorage.setItem('rooms', JSON.stringify(updatedData));
    
    setSnackbarMessage('Review added successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const openReservationModal = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
      return;
    }
    setIsReservationModalOpen(true);
  };

  const closeReservationModal = () => {
    setIsReservationModalOpen(false);
  };

  const handleReserve = ({ date, time, people }) => {
    // Check for conflicts
    const isConflict = room.reservations?.some(
      (reservation) => reservation.date === date && reservation.time === time
    );

    if (isConflict) {
      setSnackbarMessage(`The room is already booked for ${date} at ${time}.`);
      setSnackbarSeverity('error');
    } else {
      const newReservation = { date, time, people };
      const updatedRoom = {
        ...room,
        reservations: [...(room.reservations || []), newReservation],
      };
      setRoom(updatedRoom);
      const savedData =
        JSON.parse(localStorage.getItem('rooms')) || mockData.rooms;
      const updatedData = savedData.map((room) =>
        room.id === parseInt(id) ? updatedRoom : room
      );
      localStorage.setItem('rooms', JSON.stringify(updatedData));
      setSnackbarMessage(`Reservation successful for ${date} at ${time}.`);
      setSnackbarSeverity('success');
    }

    setSnackbarOpen(true);
    closeReservationModal();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCloseDialog = () => {
    setShowLoginDialog(false);
  };

  const handleLoginClick = () => {
    handleCloseDialog();
    setIsLoginModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress sx={{ color: 'orange' }} />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex justify-center items-center h-screen">
        Room not found
      </div>
    );
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
      <div className="flex flex-col justify-between mb-6">
        <div className="max-w-screen-md">
          <h1 className="text-[40px] font-bold text-gray-800">{room.name}</h1>
          <div className="flex items-center gap-[20px]">
            <div className="flex items-center text-yellow-400 mt-2">
              {Array.from({ length: 5 }).map((_, index) => {
                if (index < Math.floor(room.rating)) {
                  return <Star key={index} className="text-yellow-400" />;
                } else if (
                  index === Math.floor(room.rating) &&
                  room.rating % 1 >= 0.5
                ) {
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
        <p className="text-[18px] text-gray-500 py-3">{room.description}</p>

        <div className="mt-4 md:mt-0">
          <div onClick={openReservationModal} className="inline-block mt-4">
            <button className="bg-orange-500 text-white px-[20px] py-[15px] rounded-[20px]">
              Reserve Now
            </button>
          </div>
          {isReservationModalOpen && (
            <ReservationModal
              isOpen={isReservationModalOpen}
              onClose={closeReservationModal}
              onReserve={handleReserve}
            />
          )}
        </div>
      </div>

      {/* Comments Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Guest Reviews
      </h2>

      {/* Form to Add or Edit a Review */}
      <ReviewForm
        isLoggedIn={isLoggedIn}
        handleAddReview={handleAddReview}
        openLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Display Existing Reviews */}
      <ul className="space-y-6">
        {room.comments.map((comment, index) => (
          <li key={index} className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gray-700 rounded-full w-[50px] h-[50px] text-[20px] flex items-center justify-center text-white ">
                  {comment.user.charAt(0)}
                </div>
                <div className="ml-3">
                  <strong className=" text-gray-800">
                    {comment.user}
                  </strong>
                  <div className="text-sm text-gray-500">
                    {comment.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center text-yellow-400">
                <span className="font-semibold">{comment.rating}</span>
                <span className="ml-1">★</span>
              </div>
            </div>
            <p className="text-gray-600 mt-2">{comment.comment}</p>
          </li>
        ))}
      </ul>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

      {/* Login Dialog */}
      <Dialog
        open={showLoginDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login Required"}</DialogTitle>
        <DialogContent>
          You need to log in to make a reservation. Please log in to proceed.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleLoginClick}
            color="primary"
            autoFocus
          >
            Log in
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RoomDetails;
