import { useEffect, useRef } from "react";
import { usePlaylist } from "../context/PlaylistContext";

export default function Player() {
  const {
    playlist,
    currentIndex,
    setCurrentIndex,
    isPlaying,
    setIsPlaying
  } = usePlaylist();

  const audioRef = useRef(null);
  const current = playlist[currentIndex];

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((e) =>
        console.error("🔊 playback error:", e)
      );
    } else {
      audioRef.current.pause();
    }
  }, [current, isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? playlist.length - 1 : prev - 1
    );
    setIsPlaying(true);
  };

  if (!current?.attributes) return null;

  const title = current.attributes.name;
  const artist = current.attributes.artistName;
  const previewUrl = current.previewUrl ||
                   current.hub?.actions?.find((a) => a.uri)?.uri ||
                   current.attributes?.previews?.[0]?.url;


  return (
    <div className="fixed bottom-0 w-full bg-green-900 text-white px-6 py-4 flex flex-col sm:flex-row justify-between items-center z-50">
      <div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm">{artist}</p>
      </div>

      <div className="flex items-center space-x-4 mt-2 sm:mt-0">
        <button onClick={handlePrev} className="text-xl">⏮️</button>
        <button onClick={() => setIsPlaying(!isPlaying)} className="text-2xl">
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        <button onClick={handleNext} className="text-xl">⏭️</button>
      </div>

      {previewUrl && (
        <audio
          ref={audioRef}
          src={previewUrl}
          preload="auto"
          onEnded={handleNext}
        />
      )}
    </div>
  );
}
