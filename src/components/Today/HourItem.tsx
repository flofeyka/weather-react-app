import { useDisclosure } from "@nextui-org/react";
import WeatherModal from "../WeatherModal";

export default function HourItem({ day }: { day: any }) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const hour = new Date(day.dt_txt).getUTCHours() + ":00";

  return (
    <div
      key={day}
      onClick={onOpen}
      className="flex flex-col items-center text-center text-2xl hover:bg-[#333] transition-all rounded-xl"
    >
      <WeatherModal
        temp={day.main.temp}
        grnd_level={day.main.grnd_level}
        humidity={day.main.humidity}
        windSpeed={day.main.windSpeed}
        time={hour}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <div>{hour}</div>
      <div className="w-full flex justify-center">
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
  );
}
