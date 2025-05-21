import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useGetCurrentPosition = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("위치 서비스 접근 권한이 필요합니다.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  return {
    location,
    errorMsg,
  };
};

export default useGetCurrentPosition;
