// parts/GenreTracks.jsx
import { useParams } from "react-router-dom";
import { genreTracks } from "./mockGenres"; 
import MusicCard from "../components/MusicCard";

export default function GenreTracks() {
  const { genreName } = useParams();
  const tracks = genreTracks[genreName] || [];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 capitalize">{genreName} Vibes</h2>
      {tracks.length === 0 ? (
        <p>No songs available for this genre.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {tracks.map((song) => (
            <MusicCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}
