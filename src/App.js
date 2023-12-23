import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Trending from './Components/Body/Trending';
import Series from './Components/Body/Series';
import Movies from "./Components/Body/Movies";
import Upcoming from "./Components/Body/Upcoming";
import Start from "./Components/Start/Start";
function App() {
  return (
    <BrowserRouter>
      <>
        
        <Routes>
        <Route path="/upcoming" element={<Upcoming />} />
        <Route exact path="/" element={<Start />} />
          <Route path="/popular" element={<Trending />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
        </Routes>
    
      </>
    </BrowserRouter>
  );
}

export default App;
