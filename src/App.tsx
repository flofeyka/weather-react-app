import React, { useEffect } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { weatherAPI } from "./api/weatherAPI";
import "./App.css";
import FiveDays from "./components/FiveDays/FiveDays";
import Header from "./components/Header";
import Map from "./components/Map";
import Hours from "./components/Today/Hours";
import { useGeolocation } from "./hooks/useGeolocation";

export default function App() {
  const [cityState, setCityState] = React.useState<{
    lat: number;
    lon: number;
    name: string;
  }>(
    JSON.parse(localStorage.getItem("geoData")) || {
      lat: null as number,
      lon: null as number,
      name: null as string,
    }
  );
  const [weatherState, setWeatherState] = React.useState({
    list: [],
  });

  const { locationInfo } = useGeolocation();

  useEffect(() => {
    const fetchWeatherData = async () => {
      const fetchData = await weatherAPI.fetchWeatherByGeo(
        locationInfo?.latitude || cityState.lat || 55.751244,
        locationInfo?.longitude || cityState.lon || 37.618423
      );
      if (!fetchData) {
        return;
      }
      setWeatherState(fetchData);
      setCityState({
        lat: fetchData.city.coord.lat,
        lon: fetchData.city.coord.lon,
        name: fetchData.city.name,
      });
    };
    fetchWeatherData();
  }, [
    cityState.lat,
    cityState.lon,
    locationInfo?.latitude,
    locationInfo?.longitude,
  ]);

  return (
    <div className="bg-[#111] h-screen h-full">
      <Header setCityState={setCityState} />
      <div className="p-10">
        <div className="flex gap-5 w-full justify-center">
          <Hours
            cityName={cityState.name}
            today={weatherState?.list?.filter(
              (val) =>
                new Date(val.dt_txt).getUTCDate() >
                new Date(Date.now()).getUTCDate()
            )}
          />
          <Map
            lon={JSON.parse(localStorage.getItem("geoData")).lon || 37.618423}
            lat={JSON.parse(localStorage.getItem("geoData")).lat || 55.751244}
          />
        </div>
        <div className="w-full justify-center flex">
          <FiveDays days={weatherState.list} />
        </div>
      </div>
    </div>
  );
}
