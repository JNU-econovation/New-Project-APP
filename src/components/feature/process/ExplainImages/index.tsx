// import Text from "@components/common/shared/ui/Text";
import { Dimensions, Image, View } from "react-native";

const { width } = Dimensions.get("window");
// const usableHeight = height - 100;

const ExplainImage1 = () => {
  return (
    <View
      style={{
        display: "flex",
        gap: 40,
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <Image
        source={require("@assets/images/guide1.png")}
        style={{ width: width * 0.6, height: width * 0.6 }}
      />
    </View>
  );
};

const ExplainImage2 = () => {
  return (
    <View
      style={{
        display: "flex",
        gap: 40,
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <Image
        source={require("@assets/images/guide2.png")}
        style={{ width: width * 0.6, height: width * 0.6 }}
      />
    </View>
  );
};
const ExplainImage3 = () => {
  return (
    <View
      style={{
        display: "flex",
        gap: 40,
        alignItems: "center",
        marginBottom: 20,
        justifyContent: "center",
      }}
    >
      <Image
        source={require("@assets/images/guide3.png")}
        style={{ width: width * 0.6, height: width * 0.6 + 10 }}
      />
    </View>
  );
};

export default [ExplainImage1, ExplainImage2, ExplainImage3];
