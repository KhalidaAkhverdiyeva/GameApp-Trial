import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomList from './components/RoomList';
import RoomDetails from './components/RoomDetails';
import Layout from '../layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element={<Layout />}>
        <Route path="/" element={<RoomList />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
