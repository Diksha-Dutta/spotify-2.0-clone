import { useState } from "react";
import { searchTracks } from "../api/Music";
import MusicCard from "../components/MusicCard";

export default function Album() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await searchTracks(query);
      const tracks = Array.isArray(data) ? data : [];
      setSongs(tracks);
    } catch (err) {
      console.error("💥 Album search failed", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search albums, artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-900 text-white rounded"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-gray-500">Loading... 🎧</p>}
      {error && <p className="text-red-600">{error}</p>}

      {songs.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {songs.map((track, i) => (
            <MusicCard key={track.key || i} song={track} />
          ))}
        </div>
      )}

      {songs.length === 0 && !loading && query && (
        <p className="text-gray-500">No results found 😔</p>
      )}
    </div>
  );
}
