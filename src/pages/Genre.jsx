
import { Link } from "react-router-dom";

const genres = [
  { name: "Pop", slug: "pop", color: "bg-pink-500" },
  { name: "Classical", slug: "classical", color: "bg-yellow-500" },
  { name: "Rock", slug: "rock", color: "bg-red-500" },
  { name: "Jazz", slug: "jazz", color: "bg-purple-500" },
];

export default function Genre() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">🎶 Explore by Genre</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {genres.map((genre) => (
          <Link
            to={`/genre/${genre.slug}`}
            key={genre.slug}
            className={`text-white rounded-xl p-6 shadow-md text-center text-lg font-semibold hover:scale-105 transform transition-all ${genre.color}`}
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
