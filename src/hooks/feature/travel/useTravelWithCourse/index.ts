import useGetCoursePathByCourseId from "@hooks/feature/useGetCoursePathByCourseId";
import globalEventEmitter from "@service/events";
import SocketManager from "@service/socket/manager";
import useToast from "@service/toast";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import useSetMapPolylineBridge from "../../bridge/useSetMapPolylineBridge";
import useGetCurrentPosition from "../../useGetCurrentPosition";

const TRAVEL_SOCKET_URL = process.env.EXPO_PUBLIC_TRAVEL_SOCKET_URL;
const TRAVEL_SOCKET_INTERVAL = 1200;

const useTravelWithCourse = ({ courseId }: { courseId: string }) => {
  const socketManager = SocketManager.getInstance();
  const { location, isLoading: isLocationLoading } = useGetCurrentPosition();
  const coordinates = useGetCoursePathByCourseId({ courseId });
  const { ref, sendSetMapPolylineMessage } = useSetMapPolylineBridge();
  const showToast = useToast();

  const { setTravelState, travelState, intervalId, setIntervalId } =
    useTravelStateStore();

  const locationRef = useRef(location);
  const isLocationLoadingRef = useRef(isLocationLoading);

  locationRef.current = location;
  isLocationLoadingRef.current = isLocationLoading;

  const connectToServer = () => {
    if (!TRAVEL_SOCKET_URL) {
      console.error("[useTravelWithCourse] 소켓 URL이 정의되지 않았습니다.");
      return;
    }
    const { accessToken } = useTokenStore.getState();

    if (!accessToken) {
      console.error("[useTravelWithCourse] 토큰이 정의되지 않았습니다.");
      return;
    }

    socketManager.makeNewConnection({
      url: TRAVEL_SOCKET_URL,
      token: accessToken,
    });
  };

  useEffect(() => {
    connectToServer();
  }, []);

  // 소켓 메시지 이벤트 구독
  useEffect(() => {
    if (!TRAVEL_SOCKET_URL) return;

    const handleSocketMessage = (response: any) => {
      if (
        typeof response.data.index === "number" &&
        typeof response.data.isArrived === "boolean" &&
        typeof response.data.isDeviation === "boolean"
      ) {
        const { index, isArrived, isDeviation, travelDistance } = response.data;
        console.log(
          "[useTravelWithCourse] 서버로부터 받은 데이터:",
          response.data,
        );

        sendSetMapPolylineMessage([
          {
            path: coordinates.slice(0, index + 1),
            strokeColor: COLORS.black,
          },
          {
            path: coordinates.slice(index),
            strokeColor: COLORS.gray20,
          },
        ]);

        if (isArrived) {
          setTravelState("completed");
          showToast({
            type: "success",
            text1: "여행이 완료되었습니다.",
            text2: "즐거운 여행 되세요!",
          });

          if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
          }

          setTimeout(() => {
            router.back();
          }, 3000);
        }

        if (isDeviation) {
          showToast({
            type: "error",
            text1: "경로 이탈 감지",
            text2: "정해진 경로를 벗어났습니다.",
          });
        }
      }
    };

    const handleSocketClose = () => {
      console.warn("[useTravelWithCourse] 소켓 연결이 종료되었습니다.");
      setTravelState("idle");
    };

    const eventName = `socket-message-${TRAVEL_SOCKET_URL}`;
    const closeEventName = `socket-close-${TRAVEL_SOCKET_URL}`;

    globalEventEmitter.on(eventName, handleSocketMessage);
    globalEventEmitter.on(closeEventName, handleSocketClose);

    return () => {
      globalEventEmitter.off(eventName, handleSocketMessage);
      globalEventEmitter.off(closeEventName, handleSocketClose);
    };
  }, [
    sendSetMapPolylineMessage,
    showToast,
    setTravelState,
    coordinates,
    intervalId,
    setIntervalId,
  ]);

  const startTravel = () => {
    let socketConnectIntervalId: number;
    if (travelState !== "idle" || intervalId) {
      console.warn("[useTravelWithCourse] 여행이 이미 시작되었습니다.");
      return;
    }

    if (!TRAVEL_SOCKET_URL) {
      console.error("[useTravelWithCourse] 소켓 URL이 정의되지 않았습니다.");
      return;
    }
    let socket = socketManager.getSocket(TRAVEL_SOCKET_URL);
    if (!socket) {
      console.warn(
        "[useTravelWithCourse | startTravel] 소켓이 연결되지 않았습니다. 재시도합니다.",
      );
      socketConnectIntervalId = setInterval(() => {
        if (!!socketManager.getSocket(TRAVEL_SOCKET_URL)) {
          console.log("[useTravelWithCourse] 소켓 연결 성공");
          clearInterval(socketConnectIntervalId);
          socket = socketManager.getSocket(TRAVEL_SOCKET_URL);
        }
      }, 100);
    }

    const newIntervalId = setInterval(() => {
      if (!TRAVEL_SOCKET_URL) {
        console.warn("[useTravelWithCourse] 소켓 URL이 정의되지 않았습니다.");
        return;
      }

      const currentLocation = locationRef.current;
      const currentIsLoading = isLocationLoadingRef.current;

      if (socket && !currentIsLoading && currentLocation) {
        // console.log("[useTravelWithCourse] 현재 위치 전송:", currentLocation);
        const { latitude, longitude } = currentLocation.coords;
        socket.sendMessage({
          event: "current-position",
          data: {
            coordinate: [longitude, latitude],
          },
        });
      }
    }, TRAVEL_SOCKET_INTERVAL);

    setIntervalId(newIntervalId);
    setTravelState("in-progress");

    //
    // if (
    //   socketManager.getSocket(TRAVEL_SOCKET_URL)
    //     ?.addEventListener
    // ) {
    //   travelSocket.current.socketManager
    //     .getSocket(TRAVEL_SOCKET_URL)
    //     ?.addEventListener("message", );
    // }
  };

  return { ref, startTravel };
};

export default useTravelWithCourse;
