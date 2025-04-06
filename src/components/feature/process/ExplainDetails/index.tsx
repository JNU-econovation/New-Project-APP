import Text from "@components/common/shared/ui/Text";
import { View } from "react-native";

const ExplainDetails1 = () => {
  return (
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
  );
};

const ExplainDetail2 = () => {
  return (
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
  );
};

const ExplainDetails3 = () => {
  return (
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
  );
};

export default [ExplainDetails1, ExplainDetail2, ExplainDetails3];
