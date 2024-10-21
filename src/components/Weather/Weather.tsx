import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRef, useState } from "react";
import Slider from "react-slick";
import FiveDays from "./Lists/FiveDays";
import Hours from "./Lists/Hours";

export default function Weather({ cityName, today, days }) {
  const [selected, setSelected] = useState<"today" | "5 days">("today");
  const sliderRef = useRef<Slider | null>(null);

  const scrollToPrev = () => sliderRef.current?.slickPrev();
  const scrollToNext = () => sliderRef.current?.slickNext();
  return (
    <Card className="w-[45vw] p-2">
      {today?.length !== 0 ? (
        <div>
          <CardHeader className="text-3xl font-semibold flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div>Погода в г. {cityName}</div>
              <div className="text-xs flex gap-2 items-center">
                <button
                  onClick={() => setSelected("today")}
                  className={`h-[90%] transition-all p-3 rounded-xl ${
                    selected === "today"
                      ? "bg-[#444] hover:bg-[#333]"
                      : "bg-[#333] hover:bg-[#444] "
                  }`}
                >
                  Сегодня
                </button>
                <button
                  onClick={() => setSelected("5 days")}
                  className={`h-[90%] transition-all p-3 rounded-xl ${
                    selected === "5 days"
                      ? "bg-[#444] hover:bg-[#333]"
                      : "bg-[#333] hover:bg-[#444]"
                  }`}
                >
                  На 5 дней
                </button>
              </div>
            </div>
            {selected === "today" && (
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
            )}
          </CardHeader>
          <CardBody>
            {selected === "5 days" ? (
              <FiveDays days={days} />
            ) : (
              <Hours today={today} sliderRef={sliderRef} />
            )}
          </CardBody>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center text-xl gap-3 font-semibold">
          <div>Произошла непредвиденная ошибка</div>
          <Button color="primary" onClick={() => window.location.reload()}>
            Обновить
          </Button>
        </div>
      )}
    </Card>
  );
}
