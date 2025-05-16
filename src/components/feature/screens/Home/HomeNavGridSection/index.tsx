import { COLORS } from "@/src/styles/colorPalette";
import Spacing from "@components/common/shared/layout/Spacing";
import Text from "@components/common/shared/ui/Text";
import styled from "@emotion/native";
import { View } from "react-native";

const HomeNavGridSection = () => {
  return (
    <Container>
      <ButtonContainer>
        <HomeLinkButton>
          <Text fontSize={20}>코스 탐색</Text>
          <View>
            <Text fontSize={12}>내비게이션 및</Text>
            <Text fontSize={12}>코스 기록</Text>
          </View>
        </HomeLinkButton>

        <HomeLinkButton>
          <Text fontSize={20}>산행 시작</Text>
          <Text fontSize={12}>운동 기록하기</Text>
        </HomeLinkButton>
      </ButtonContainer>

      <Spacing gap={10} />

      <ButtonContainer>
        <HomeLinkButton>
          <Text fontSize={20}>신고하기</Text>
          <Text fontSize={12}>구조대 신고</Text>
        </HomeLinkButton>

        <HomeLinkButton>
          <Text fontSize={20}>안전 매뉴얼</Text>
          <View>
            <Text fontSize={12}>사고발생시</Text>
            <Text fontSize={12}>대처방법</Text>
          </View>
        </HomeLinkButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.View``;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const HomeLinkButton = styled.View`
  flex: 1;
  height: 100px;
  background-color: ${COLORS.mainWhite};
  border-radius: 10px;
  padding: 16px;
  justify-content: space-between;
`;

export default HomeNavGridSection;
