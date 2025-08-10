import SocketManager from "@service/socket/manager";
import StartButton from "@shared/ui/buttons/StartButton";
import useTravelStateStore from "@store/travel";
import { useLocalSearchParams } from "expo-router";

const TravelContinueButton = () => {
  const { courseId } = useLocalSearchParams();
  const socketManager = SocketManager.getInstance();
  const { connectedURL } = useTravelStateStore();

  const handleContinue = () => {
    const message = courseId
      ? {
          event: "restart",
          data: {
            coordinate: [],
            courseId,
            time: Date.now(),
          },
        }
      : {
          event: "restart",
          data: {
            coordinate: [],
            time: Date.now(),
          },
        };

    socketManager.getSocket(connectedURL || "")?.sendMessage(message);
  };

  return <StartButton onPressOut={handleContinue} />;
};

export default TravelContinueButton;
