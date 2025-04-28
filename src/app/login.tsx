import Spacing from "@components/common/shared/layout/Spacing";
import {
  HikingSVG,
  LeftArrowBlackSVG,
  StarSVG,
} from "@components/common/shared/ui/Icons";
import Text from "@components/common/shared/ui/Text";
import AppleLoginButton from "@components/feature/widget/AppleLoginButton";
import KakaoLoginButton from "@components/feature/widget/KakaoLoginButton";
import styled from "@emotion/native";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

const LoginScreen = () => {
  return (
    <Container>
      <Spacing gap={28} />
      <HeaderContainer>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
          <LeftArrowBlackSVG />
        </TouchableOpacity>
      </HeaderContainer>

      <Spacing gap={24} />

      <TitleContainer>
        <Text fontSize={30} fontWeight="bold">
          그럼,
        </Text>
        <Text fontSize={30} fontWeight="bold">
          모험을 시작해볼까요?
        </Text>
        <TitleStarPositioner>
          <StarSVG />
        </TitleStarPositioner>
      </TitleContainer>

      <Spacing gap={68} />
      <HikingSVG />
      <Spacing gap={68} />

      <KakaoLoginButton />

      <Spacing gap={14} />
      <AppleLoginButton />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding-inline: 25px;
  padding-block: 40px;
  align-items: center;
`;

const TitleContainer = styled.View`
  position: relative;
  width: 100%;
`;

const TitleStarPositioner = styled.View`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0px, -12px);
`;

const HeaderContainer = styled.View`
  width: 100%;
`;

export default LoginScreen;
