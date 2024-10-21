import { Button } from "@nextui-org/react";
import WeatherElementItem from "../WeatherElementItem";

const getAverageValue = (values) => {
  const sum = values.reduce((acc, number) => acc + number, 0);
  const length = values.length;
  return sum / length;
};

export default function FiveDays({ days }: { days: any }) {
  const daysSorted = days.reduce((acc, vol) => {
    const date = new Date(vol.dt_txt);
    const day = date.getUTCDate(); // Получаем день месяца

    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(vol);

    return acc;
  }, {});
  console.log(Object.entries(daysSorted));
  const averageValuesAtDays = Object.entries(daysSorted).map((day: any) => ({
    date: day[0],
    weatherIcon: day[1][0].weather[0].main,
    temp: getAverageValue(day[1].map((dayItem) => dayItem.main.temp)),
    grnd_level: getAverageValue(
      day[1].map((dayItem) => dayItem.main.grnd_level)
    ),
    humidity: getAverageValue(day[1].map((dayItem) => dayItem.main.humidity)),
    wind_speed: getAverageValue(day[1].map((dayItem) => dayItem.wind.speed)),
  }));
  console.log(averageValuesAtDays);

  return (
    <div>
      {Object.entries(averageValuesAtDays).length > 0 ? (
        <div>
          <div className="h-full relative w-full">
            <div className="flex justify-between w-full gap-3">
              {Object.entries(averageValuesAtDays).map((day) => (
                <WeatherElementItem
                  time={`${day[1].date}.${new Date(Date.now()).getUTCMonth()+1}`}
                  temp={day[1].temp}
                  grnd_level={day[1].grnd_level}
                  humidity={day[1].grnd_level}
                  windSpeed={day[1].wind_speed}
                  iconName={day[1].weatherIcon}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center text-xl gap-3 font-semibold">
          <div>Произошла непредвиденная ошибка</div>
          <Button color="primary" onClick={() => window.location.reload()}>
            Обновить
          </Button>
        </div>
      )}
    </div>
  );
}
