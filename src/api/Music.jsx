import axios from "axios";

const headers = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
};
const options = {
  method: "GET",
    url: "https://shazam-core.p.rapidapi.com/v1/search/multi",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
  },
};

export const getTopTracks = async () => {
  try {
    const response = await axios.get(
      "https://shazam-core.p.rapidapi.com/v1/charts/country?country_code=IN", 
      {
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
        },
      }
    );
    console.log("✅ Top Tracks Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("🔥 API ERROR", error.response?.status, error.message);
    throw error;
  }
};


export const getTracksByGenre = async (genre) => {
  const response = await axios.get(
    `https://shazam-core.p.rapidapi.com/v1/charts/genre-world?genre_code=${genre}`,
    { headers }
  );
  return response.data;
};

export const getAlbumDetails = async (albumId) => {
  const response = await axios.get(
    `https://shazam-core.p.rapidapi.com/v1/albums/details?album_id=${albumId}`,
    { headers }
  );
  return response.data;
};




export const searchTracks = async (query) => {
  if (!query || typeof query !== "string") {
    console.warn("⚠️ Invalid query passed to searchTracks:", query);
    return [];
  }

  try {
    const response = await axios.request({
      ...options,
      params: { query, search_type: "SONGS" },
    });

    console.log("🎯 Full search response:", response.data);

    const hits = response.data?.tracks?.hits;

    if (!Array.isArray(hits)) {
      console.error("🚫 No hits array found.");
      return [];
    }

    const cleaned = hits.map(hit => hit.track).filter(Boolean);
    return cleaned;
  } catch (err) {
    console.error("🔥 searchTracks Error:", err);
    throw err;
  }
};
