import SocketManager from "@service/socket/manager";
import PauseButton from "@shared/ui/buttons/PauseButton";
import useTravelStateStore from "@store/travel";
import { useLocalSearchParams } from "expo-router";

const TravelPauseButton = () => {
  const { courseId } = useLocalSearchParams();
  const socketManager = SocketManager.getInstance();
  const { connectedURL } = useTravelStateStore();

  const handlePause = () => {
    const message = courseId
      ? {
          event: "pause",
          data: {
            coordinate: [],
            courseId,
            time: Date.now(),
          },
        }
      : {
          event: "pause",
          data: {
            coordinate: [],
            time: Date.now(),
          },
        };

    socketManager.getSocket(connectedURL || "")?.sendMessage(message);
  };

  return <PauseButton onPressOut={handlePause} />;
};

export default TravelPauseButton;
