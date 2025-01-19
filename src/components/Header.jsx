import { useState } from 'react';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="flex justify-between items-center p-4  bg-white sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <img
          src="src/assets/gamelogo.png"
          alt="Logo"
          className="h-20 mr-3"
        />
      </div>

      {/* Right Section with User Icon and Menu */}
      <div
      onClick={handleMenuClick}
       className="flex cursor-pointer items-center space-x-4 border p-2 rounded-full hover:bg-gray-200">
  <IconButton
    
    className="bg-gray-100 rounded-full p-1"
  >
    <MenuIcon className="text-gray-600" />
  </IconButton>
  <Avatar
    src="/path/to/user-icon.png"
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

export default Header;
