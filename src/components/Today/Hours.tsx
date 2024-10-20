import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import Slider from "react-slick";
import { SLIDER_DEFAULT_SETTINGS } from "../../utils/slider";
import HourItem from "./HourItem";
import { useRef } from "react";

export default function Hours({ cityName, today }) {
  const sliderRef = useRef<Slider | null>(null);

  const scrollToPrev = () => sliderRef.current?.slickPrev();
  const scrollToNext = () => sliderRef.current?.slickNext();

  return (
    <Card className="w-[40vw] p-2">
      {today?.length !== 0 ? (
        <div>
          <CardHeader className="text-3xl font-semibold flex justify-between items-center">
            <div>Погода в г. {cityName}</div>
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
            <div>
              <Slider ref={sliderRef} {...SLIDER_DEFAULT_SETTINGS}>
                {today?.map((day) => (
                  <HourItem day={day} />
                ))}
              </Slider>
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
