import { Outlet } from "react-router-dom"
import Header from "./src/components/Header"
import mockData from "./src/data/mockData.json"

import { useState } from "react";

const Layout = () => {
    const [filteredRooms, setFilteredRooms] = useState(mockData.rooms);

    const handleSearch = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = mockData.rooms.filter(
          (room) =>
            room.name.toLowerCase().includes(lowerCaseQuery) ||
            room.description.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredRooms(filtered);
    };

    return (
        <>
            <Header onSearch={handleSearch} />
            <main>
                <Outlet context={{ filteredRooms }} />
            </main>
        </>
    )
}

export default Layout