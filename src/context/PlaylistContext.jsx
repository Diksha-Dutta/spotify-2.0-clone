import { createContext, useContext, useState, useEffect } from "react";

const PlaylistContext = createContext();
export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState(() => {
    const stored = localStorage.getItem("myVibes");
    return stored ? JSON.parse(stored) : [];
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track) => {
    const index = playlist.findIndex(t => t.id === track.id);
    if (index !== -1) {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  const addToPlaylist = (track) => {
    const exists = playlist.find(t => t.id === track.id);
    let updated;
    if (!exists) {
      updated = [...playlist, track];
      setPlaylist(updated);
      setCurrentIndex(updated.length - 1); 
    } else {
      const index = playlist.findIndex(t => t.id === track.id);
      setCurrentIndex(index);
    }
    setIsPlaying(true);
  };

  useEffect(() => {
    localStorage.setItem("myVibes", JSON.stringify(playlist));
  }, [playlist]);

  return (
    <PlaylistContext.Provider
  value={{
    playlist,
    addToPlaylist,
    currentIndex,
    setCurrentIndex,
    isPlaying,
    setIsPlaying,
    playTrack,
  }}
>
  {children}
</PlaylistContext.Provider>

  );
};
