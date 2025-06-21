import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-green-900 text-white">
      <h1 className="text-xl font-bold">VibeStream 🌿</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
       
      </div>
    </nav>
  );
}
