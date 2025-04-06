import Text from "@components/common/shared/ui/Text";
import { Dimensions, Image, View } from "react-native";

const { width, height } = Dimensions.get("window");
const usableHeight = height - 130;

const ExplainItem1 = () => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: usableHeight,
      }}
    >
      <View
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text fontSize={30} fontWeight="bold" color="mainGreen">
          안전한 모험의 시작
        </Text>
        <Image
          source={require("@assets/images/guide1.png")}
          style={{ width: width * 0.6, height: width * 0.6 }}
        />
        <View>
          <Text
            fontSize={20}
            fontWeight="semibold"
            opacity={0.6}
            textAlign="center"
          >
            실시간 코스 안내와 실시간 정보로
          </Text>
          <Text
            fontSize={20}
            fontWeight="semibold"
            opacity={0.6}
            textAlign="center"
          >
            완벽한 산행 준비
          </Text>
        </View>
      </View>
    </View>
  );
};
const ExplainItem2 = () => {
  const { width, height } = Dimensions.get("window");
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: usableHeight,
      }}
    >
      <View
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text fontSize={30} fontWeight="bold" color="mainGreen">
          안전을 위한 스마트 가이드
        </Text>
        <Image
          source={require("@assets/images/guide2.png")}
          style={{ width: width * 0.6, height: width * 0.6 }}
        />
        <View>
          <Text
            fontSize={20}
            fontWeight="semibold"
            opacity={0.6}
            textAlign="center"
          >
            경로 이탈, 사고 다발 구역
          </Text>
          <Text
            fontSize={20}
            fontWeight="semibold"
            opacity={0.6}
            textAlign="center"
          >
            음성 안내 지원
          </Text>
        </View>
      </View>
    </View>
  );
};
const ExplainItem3 = () => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: usableHeight,
      }}
    >
      <View
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text fontSize={30} fontWeight="bold" color="mainGreen">
          나만의 멸종위기 동물 키우기
        </Text>
        <Image
          source={require("@assets/images/guide3.png")}
          style={{ width: width * 0.6, minHeight: width * 0.6 + 10 }}
        />
        <View>
          <Text
            fontSize={20}
            fontWeight="semibold"
            opacity={0.6}
            textAlign="center"
          >
            산행하면서 획득한 먹이로
          </Text>
          <Text
            fontSize={20}
            fontWeight="semibold"
            opacity={0.6}
            textAlign="center"
          >
            나만의 동물을 키워보세요
          </Text>
        </View>
      </View>
    </View>
  );
};

export default [ExplainItem1, ExplainItem2, ExplainItem3];
