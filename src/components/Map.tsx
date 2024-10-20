import { Card } from "@nextui-org/react";
import {
  reactify,
  YMap,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapMarker,
} from "../lib/ymaps";

export default function Map({ lat, lon }: { lat: number; lon: number }) {

  return (
    <Card className="w-[40vw] min-h-[25vh]">
      <YMap
        theme="dark"
        location={reactify.useDefault({
          center: [lon, lat],
          zoom: 9,
        })}
        
      >
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
      </YMap>
    </Card>
  );
}
