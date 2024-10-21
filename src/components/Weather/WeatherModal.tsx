import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export default function WeatherModal({
  temp,
  grnd_level,
  humidity,
  windSpeed,
  time,
  isOpen,
  onOpenChange,

}: {
  temp: number;
  grnd_level: number;
  humidity: number;
  windSpeed: number;
  time: string;
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  return (
    <Modal onOpenChange={onOpenChange} isOpen={isOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-xl font-semibold">{time}</ModalHeader>
            <ModalBody>
              <div>Температура: {Math.ceil(temp)}°</div>
              <div>Уровень давления: {Math.ceil(grnd_level)} гПА</div>
              <div>Влажность воздуха: {Math.ceil(humidity)}%</div>
              <div>Скорость ветра: {Math.ceil(windSpeed)} м/с</div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
