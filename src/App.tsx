import { Card, Spinner } from "@nextui-org/react";
import React, { useLayoutEffect } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { weatherAPI } from "./api/weatherAPI";
import "./App.css";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Weather from "./components/Weather/Weather";
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

  useLayoutEffect(() => {
    if (locationInfo && !cityState.lat && !cityState.lon && !cityState.name) {
      setCityState({
        lat: locationInfo.latitude,
        lon: locationInfo.longitude,
        name: null as string,
      });
    }
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
    cityState.name
  ]);

  return (
    <div className="bg-[#111] h-screen">
      <Header setCityState={setCityState} />
      <div className="flex gap-5 w-full justify-center mt-10 min-h-[25vh]">
        <Weather
          days={weatherState.list}
          cityName={cityState.name}
          today={weatherState?.list?.filter(
            (val) =>
              new Date(val.dt_txt).getUTCDate() >
              new Date(Date.now()).getUTCDate()
          )}
        />
        {cityState.name ? (
          <Map
            lon={cityState?.lon || 37.618423}
            lat={cityState?.lat || 55.751244}
          />
        ) : (
          <Card className="w-[45vw] h-full">
            <div className="flex flex-col h-full w-full justify-center items-center">
              <Spinner color="primary" size="lg" />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
