import { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Header = ({ onSearch }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src="/assets/gamelogo.jpeg" alt="Logo" className="h-[100px] mr-3" />
      </div>

      {/* Search Input */}
      <div className="flex flex-grow items-center mx-[12px] md:mx-2 relative">
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-[20px] py-[15px] border rounded-full shadow-sm outline-none placeholder-transparent sm:placeholder-gray-400"
        />
        <SearchIcon className="absolute right-3 text-orange-500" />
      </div>

      {/* Right Section with User Icon and Menu */}
      <div
        onClick={handleMenuClick}
        className="flex cursor-pointer items-center space-x-4 border p-2 rounded-full hover:bg-gray-200"
      >
        <IconButton className="bg-gray-100 rounded-full p-1">
          <MenuIcon className="text-orange-500" />
        </IconButton>
        <Avatar
          src="/user-icon.png"
          alt="User Icon"
          className="cursor-pointer"
        />
      </div>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Login</MenuItem>
        <MenuItem onClick={handleClose}>Sign Up</MenuItem>
        <MenuItem onClick={handleClose}>Host Dashboard</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
