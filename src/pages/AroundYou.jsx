import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shaZamCore";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector(({ player }) => player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);
  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_ffKpc8uuoamHKVS31rNOmLTBogmyF`
      )
      .then((res) => {
        setCountry(res?.data?.location?.country)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [country]);
  if (isFetching && loading) return <Loader title="Loading songs around you" />;
  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You :
        <span className="font-black">
          {" "}
          {country === "VN" ? "Vietnam" : country}
        </span>
      </h2>
      <div className="flex flex-wrap sm:justify-start gap-8 justify-center">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
