import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MusicCard from "../components/MusicCard";
import { searchTracks } from "../api/Music";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("query") || "";
    setQuery(q);
  }, [location]);

 
  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const data = await searchTracks(query);
        console.log("🎯 Search Results:", data);
      
        
setResults(data);
      } catch (err) {
        console.error("❌ Error during search:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

 
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search for songs, artists, albums..."
          className="w-full p-2 border rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-900 text-white rounded"
        >
          Search
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4 text-green-900">
        🔍 Search Results for: <span className="text-black">{query}</span>
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading tracks... 🎶</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">No results found.</p>
          ) : (
            results.map((song, i) => (
              <MusicCard key={i} song={song} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
