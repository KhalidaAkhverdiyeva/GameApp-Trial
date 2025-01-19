import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomList from './components/RoomList';
import RoomDetails from './components/RoomDetails';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<RoomList />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
