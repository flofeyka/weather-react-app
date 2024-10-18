import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { weatherAPI } from "./api/weatherAPI";
import "./App.css";
import Header from "./components/Header";
import { SLIDER_DEFAULT_SETTINGS } from "./utils/slider";
import { reactify, YMap, YMapDefaultFeaturesLayer, YMapDefaultSchemeLayer, YMapMarker } from "./lib/ymaps";
import { YMapLocationRequest } from "@yandex/ymaps3-types";

const days = [
  {
    id: 1,
    day: "16 окт",
    weekDay: "Ср",
    atDay: "+6",
    atNight: "-2",
    statusDay: "Сегодня",
  },
  {
    id: 2,
    day: "17 окт",
    weekDay: "Чт",
    atDay: "+6",
    atNight: "-2",
    statusDay: "Завтра",
  },
  {
    id: 3,
    day: "18 окт",
    weekDay: "Пт",
    atDay: "+6",
    atNight: "-2",
  },
  {
    id: 4,
    day: "19 окт",
    weekDay: "Сб",
    atDay: "+6",
    atNight: "-2",
  },
  {
    id: 5,
    day: "20 окт",
    weekDay: "Вс",
    atDay: "+6",
    atNight: "-2",
  },
];

// const today = [
//   {
//     id: 1,
//     time: "9:00",
//     temp: "+6",
//     status: "Ясно",
//     icon: "1.svg",
//   },
//   {
//     id: 2,
//     time: "12:00",
//     temp: "+6",
//     status: "Ясно",
//     icon: "1.svg",
//   },
//   {
//     id: 3,
//     time: "15:00",
//     temp: "+6",
//     status: "Ясно",
//     icon: "1.svg",
//   },
//   {
//     id: 4,
//     time: "18:00",
//     temp: "+6",
//     status: "Ясно",
//     icon: "1.svg",
//   },
//   {
//     id: 5,
//     time: "21:00",
//     temp: "+6",
//     status: "Ясно",
//     icon: "1.svg",
//   },
//   {
//     id: 6,
//     time: "00:00",
//     temp: "+3",
//     status: "Пасмурно",
//     icon: "1.svg",
//   },
// ];

// const LOCATION: YMapLocationRequest = {
//   center: [37.588144, 55.733842],
//   zoom: 9,
// };

const LOCATION: YMapLocationRequest = {
  center: [37.588144, 55.733842],
  zoom: 9
};


function App() {
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
  const today = weatherState?.list?.filter(
    (val) =>
      new Date(val.dt_txt).getUTCDate() > new Date(Date.now()).getUTCDate()
  );

  useEffect(() => {
    const fetchWeatherData = async () => {
      const fetchData = await weatherAPI.fetchWeatherByGeo(
        cityState.lat,
        cityState.lon
      );
      if (!fetchData) {
        return;
      }
      setWeatherState(fetchData);
    };

    fetchWeatherData();
  }, [cityState.lat, cityState.lon]);

  const sliderRef = useRef<Slider | null>(null);

  const scrollToPrev = () => sliderRef.current?.slickPrev();
  const scrollToNext = () => sliderRef.current?.slickNext();

  return (
    <div className="bg-[#111] h-screen h-full">
      <Header setCityState={setCityState} />
      <div className="p-10">
        <div className="flex gap-5 w-full justify-center">
          <Card className="w-[40vw] p-2">
            <CardHeader className="text-3xl font-semibold flex justify-between items-center">
              <div>Погода в г. {cityState.name}</div>
              <div className="flex gap-2">
                <button
                  onClick={scrollToPrev}
                  className="rounded-full bg-[#333] hover:bg-[#444] transition-all w-[40px] h-[40px] flex justify-center items-center "
                >
                  <img
                    src="/icons/arrow-left.svg"
                    className="h-[22.5px] w-[22.5px]"
                    alt="arrow-left"
                  />
                </button>
                <button
                  onClick={scrollToNext}
                  className="rounded-full bg-[#333] hover:bg-[#444] transition-all w-[40px] h-[40px] flex justify-center items-center"
                >
                  <img
                    src="/icons/arrow-right.svg"
                    className="h-[22.5px] w-[22.5px]"
                    alt="arrow-right"
                  />
                </button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="pl-3">
                <Slider ref={sliderRef} {...SLIDER_DEFAULT_SETTINGS}>
                  {today?.map((day) => (
                    <div
                      key={day}
                      className="flex flex-col items-center text-2xl"
                    >
                      <div>{new Date(day.dt_txt).getUTCHours()}:00</div>
                      <div>
                        <img
                          alt={day.dt}
                          src={`/icons/1.svg`}
                          className="min-w-[75px] min-h-[75px]"
                          width={75}
                          height={75}
                        />
                      </div>
                      <div>{Math.ceil(day.main.temp)}°</div>
                    </div>
                  ))}
                </Slider>
              </div>
            </CardBody>
          </Card>
          <Card className="w-[40vw] p-2">
            <YMap location={reactify.useDefault(LOCATION)}>
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />

            <YMapMarker
              coordinates={reactify.useDefault([37.588144, 55.733842])}
              draggable={true}
            >
              <section>
                <h1>You can drag this header</h1>
              </section>
            </YMapMarker>
          </YMap>
          </Card>
        </div>
        <div className="w-full justify-center flex">
          <Card className="w-[81vw] p-2 mt-5">
            <CardHeader className="text-3xl font-semibold">
              Погода на 5 дней
            </CardHeader>
            <CardBody className="h-full overflow-x-auto relative w-full">
              <div className="flex justify-between w-full gap-3 pr-4 px-1">
                {days.map((day) => (
                  <div
                    key={day.id}
                    className="text-xl font-semibold flex flex-col"
                  >
                    <div className="text-2xl text-gray">
                      {day.statusDay || day.weekDay}
                    </div>
                    <div className="text-xl">{day.day}</div>
                    <img
                      alt="icon"
                      src="/icons/1.svg"
                      className="relative w-[135px] h-[135px]"
                    />
                    <div className="leading-4 gap-0">
                      <div className="text-2xl font-bold">{day.atDay}</div>
                      <div className="text-gray-600">{day.atNight}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
