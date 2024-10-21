import Slider from "react-slick";
import { SLIDER_DEFAULT_SETTINGS } from "../../../utils/slider";
import WeatherElementItem from "../WeatherElementItem";

export default function Hours({sliderRef, today}) {
  return (
    <div>
      <Slider ref={sliderRef} {...SLIDER_DEFAULT_SETTINGS}>
        {today?.map((day) => (
          <WeatherElementItem time={new Date(day.dt_txt).getUTCHours() + ":00"} iconName={day.weather[0].main} temp={day.main.temp} grnd_level={day.main.grnd_level} humidity={day.main.humidity} windSpeed={day.main.wind_speed} />
        ))}
      </Slider>
    </div>
  );
}
