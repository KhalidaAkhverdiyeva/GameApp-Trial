import { useState } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Rating } from "@mui/material";

export default function ReviewForm({ isLoggedIn, handleAddReview, handleUpdateReview, editingReview, openLoginModal }) {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowLoginDialog(true); // Show dialog if not logged in
      return;
    }
    if (editingReview !== null) {
      handleUpdateReview();
    } else {
      handleAddReview();
    }
    setNewReview(""); // Clear the review field after submitting
    setNewRating(0);  // Reset rating
  };

  const handleCloseDialog = () => {
    setShowLoginDialog(false);
  };

  const handleLoginClick = () => {
    handleCloseDialog();
    openLoginModal(); // Open login modal
  };

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4"
      >
        <textarea
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
          rows="4"
        ></textarea>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <label htmlFor="rating" className="mr-4 text-gray-700">
              Rating:
            </label>
            <Rating
              name="rating"
              value={Number(newRating)}
              onChange={(e, value) => setNewRating(value)}
              precision={1}
              size="large"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
          >
            {editingReview !== null ? "Update Review" : "Submit Review"}
          </button>
        </div>
      </form>

      {/* Material-UI Dialog for Login Prompt */}
      <Dialog
        open={showLoginDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login Required"}</DialogTitle>
        <DialogContent>
          You need to log in to write a comment. Please log in to proceed.
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
    </div>
  );
}

// Define prop types for the component
ReviewForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleAddReview: PropTypes.func.isRequired,
  handleUpdateReview: PropTypes.func.isRequired,
  editingReview: PropTypes.number, // or PropTypes.oneOfType([PropTypes.number, PropTypes.null])
  openLoginModal: PropTypes.func.isRequired,
};
