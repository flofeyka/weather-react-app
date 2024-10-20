import { useDisclosure } from "@nextui-org/react";
import WeatherModal from "../WeatherModal";

export default function DayItem({ day }: { day: any }) {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const time = `${day.date}.${new Date(Date.now()).getUTCMonth() + 1}`;
  return (
    <div
      key={day}
      onClick={onOpen}
      className="text-xl hover:bg-[#333] transition-all w-full rounded-2xl items-center font-semibold flex flex-col"
    >
      <div className="text-2xl text-gray">{time}</div>
      {/* <div className="text-xl">{day.day}</div> */}
      <WeatherModal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        temp={day.temp}
        grnd_level={day.grnd_level}
        humidity={day.humidity}
        windSpeed={day.wind_speed}
        time={time}
      />
      <img
        alt="icon"
        src={`/weather/${day.weather}.svg`}
        className="relative w-[115px] h-[115px]"
      />
      <div className="leading-4 gap-0">
        <div className="text-2xl font-bold">{Math.ceil(day.temp)}°</div>
        {/* <div className="text-gray-600">{day.atNight}</div> */}
      </div>
    </div>
  );
}
