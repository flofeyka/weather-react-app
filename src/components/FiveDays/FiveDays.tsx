import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import DayItem from "./DayItem";

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
    weather: day[1][0].weather[0].main,
    temp: getAverageValue(day[1].map((dayItem) => dayItem.main.temp)),
    grnd_level: getAverageValue(
      day[1].map((dayItem) => dayItem.main.grnd_level)
    ),
    humidity: getAverageValue(day[1].map((dayItem) => dayItem.main.humidity)),
    wind_speed: getAverageValue(day[1].map((dayItem) => dayItem.wind.speed)),
  }));
  console.log(averageValuesAtDays);

  return (
    <Card className="w-[81vw] p-2 mt-5">
      {Object.entries(averageValuesAtDays).length > 0 ? (
        <div>
          <CardHeader className="text-3xl font-semibold">
            Погода на 5 дней
          </CardHeader>
          <CardBody className="h-full overflow-x-auto relative w-full">
            <div className="flex justify-between w-full gap-3 pr-4 px-1">
              {Object.entries(averageValuesAtDays).map((day) => (
                <DayItem day={day[1]} />
              ))}
            </div>
          </CardBody>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center min-h-[25vh] text-xl gap-3 font-semibold">
          <div>Произошла непредвиденная ошибка</div>
          <Button color="primary" onClick={() => window.location.reload()}>Обновить</Button>
        </div>
      )}
    </Card>
  );
}
