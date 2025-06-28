import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-green-900 text-white">
      <h1 className="text-xl font-bold">VibeStream 🌿</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/genre">Genre</Link>
  <span className="relative group">
  <button className="text-white focus:outline-none">
    Albums 
  </button>
  <div className="absolute hidden group-hover:flex flex-col bg-white text-black mt-2 rounded shadow-lg min-w-[150px] z-50">
    <Link to="/album/lofi" className="px-4 py-2 hover:bg-green-100">Lofi</Link>
    <Link to="/album/arijit" className="px-4 py-2 hover:bg-green-100">Arijit Singh</Link>
    <Link to="/album/workout" className="px-4 py-2 hover:bg-green-100">Workout</Link>
    <Link to="/album/romantic" className="px-4 py-2 hover:bg-green-100">Romantic</Link>
  </div>
</span>   
 </div>
    </nav>
  );
}
