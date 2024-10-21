import { Button, Input } from "@nextui-org/react";
import React from "react";
import { weatherAPI } from "../../api/weatherAPI";

export default function SearchCity({
  setCityState,
}: {
  setCityState: (value) => void;
}) {
  const [cityValue, setCityValue] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);

  const onSearch = async () => {
    const fetchData = await weatherAPI.fetchGeo(cityValue);
    if (!fetchData) {
      setError(true);
    }
    setCityState({
      lat: fetchData && fetchData.lat,
      lon: fetchData && fetchData.lon,
      name: fetchData && fetchData.name,
    });
    window.location.reload();
  };

  return (
    <div className="flex gap-2">
      <Input
        isInvalid={error}
        label="Найти город"
        value={cityValue}
        size="sm"
        onChange={(e) => {
          setError(false);
          setCityValue(e.target.value);
        }}
      />
      <Button size="lg" onClick={onSearch}>
        Найти
      </Button>
    </div>
  );
}
