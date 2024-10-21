import { useDisclosure } from "@nextui-org/react";
import WeatherModal from "./WeatherModal";

export default function WeatherElementItem({
  temp,
  grnd_level,
  humidity,
  windSpeed,
  time,
  iconName,
}: {
  temp: number;
  grnd_level: number;
  humidity: number;
  time: string;
  windSpeed: number;
  iconName: string;
}) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  return (
    <div
      key={time}
      onClick={onOpen}
      className="flex flex-col items-center text-center text-2xl hover:bg-[#333] transition-all rounded-xl font-semibold w-full"
    >
      <WeatherModal
        temp={temp}
        grnd_level={grnd_level}
        humidity={humidity}
        windSpeed={windSpeed}
        time={time}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <div>{time}</div>
      <div className="w-full flex justify-center">
        <img
          alt={`icon`}
          src={`/weather/${iconName}.svg`}
          className="min-w-[75px] min-h-[75px]"
          width={75}
          height={75}
        />
      </div>
      <div>{Math.ceil(temp)}°</div>
    </div>
  );
}
