import { useEffect, useState } from "react";
import { getTopTracks } from "../api/Music";
import MusicCard from "../components/MusicCard";

export default function Home() {
  const [songs, setSongs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchTracks = async () => {
    const cached = localStorage.getItem("topTracks");
    if (cached) {
      setSongs(JSON.parse(cached));
      setLoading(false);
      return;
    }

    try {
      const data = await getTopTracks();
      console.log("🌍 API Response:", data);

      const tracks = Array.isArray(data)
        ? data
        : Array.isArray(data?.tracks)
        ? data.tracks
        : [];

      setSongs(tracks);
      localStorage.setItem("topTracks", JSON.stringify(tracks));
    } catch (err) {
      console.error("🔥 Fetching error:", err);
      setError("Couldn’t load tracks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  fetchTracks();
}, []);


  return (
    <div className="p-6">
     

      <h2 className="text-2xl font-bold mb-4">
        Top Tracks Worldwide <span role="img" aria-label="globe">🌍</span>
      </h2>

      {loading && <p className="text-gray-500">Loading your vibes... 🎶</p>}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {!loading && !error && songs?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {songs.map((track, i) => (
            <MusicCard key={track.key || i} song={track} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
