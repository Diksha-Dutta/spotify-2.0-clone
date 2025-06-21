import { usePlaylist } from "../context/PlaylistContext";

export default function MusicCard({ song }) {
  const { addToPlaylist, playTrack } = usePlaylist();

  const { image, title, artist } = normalizeSong(song);
  console.log("🎧 Incoming song:", song);

  function normalizeSong(song) {
    return {
      image:
        song.images?.coverart ||
        song.attributes?.artwork?.url?.replace("{w}x{h}", "300x300") ||
        "https://via.placeholder.com/150",
      title: song.title || song.attributes?.name || "Unknown Title",
      artist: song.subtitle || song.attributes?.artistName || "Unknown Artist",
    };
  }

  function getPreviewUrl(song) {
    return (
      song.hub?.actions?.find((a) => a.uri)?.uri ||
      song.attributes?.previews?.[0]?.url ||
      null
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img
        src={image}
        alt={title}
        className="rounded mb-2 w-full h-48 object-cover"
      />
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{artist}</p>

      <button
        className="mt-2 px-3 py-1 text-sm bg-green-900 text-white rounded"
        onClick={() => {
          const previewUrl = getPreviewUrl(song);
          if (!previewUrl) {
            alert("⚠️ No preview available for this track!");
            return;
          }
          const songWithPreview = { ...song, previewUrl };
          addToPlaylist(songWithPreview);
          playTrack(songWithPreview);
        }}
      >
        Play
      </button>
    </div>
  );
}
