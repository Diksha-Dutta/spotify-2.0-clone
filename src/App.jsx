import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Album from "./pages/Album";
import Genre from "./pages/Genre";
import GenreTracks from "./pages/GenreTracks";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
    <Route path="/albums" element={<Album />} />
 
<Route path="/genre" element={<Genre />} />
<Route path="/genre/:genreName" element={<GenreTracks />} />
      </Routes>
      <Player />
    </BrowserRouter>
  );
}
