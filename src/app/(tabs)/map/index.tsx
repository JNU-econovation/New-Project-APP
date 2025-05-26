import MapWebview from "@components/feature/screens/map/MapWebview";
import { SafeAreaView } from "react-native";

const MapScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <MapWebview />
    </SafeAreaView>
  );
};

export default MapScreen;
