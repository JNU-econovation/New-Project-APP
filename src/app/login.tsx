import PositionBottom from "@components/common/shared/layout/PositionBottom";
import Spacing from "@components/common/shared/layout/Spacing";
import Button from "@components/common/shared/ui/Button";
import { HikingSVG, StarSVG } from "@components/common/shared/ui/Icons";
import Text from "@components/common/shared/ui/Text";
import AppleLoginButton from "@components/feature/widget/AppleLoginButton";
import styled from "@emotion/native";

const LoginScreen = () => {
  return (
    <Container>
      <Title>
        {/* <WebViewWithInjected
          source={{
            uri: PATH_ROUTE.WEBVIEW.LOGIN,
          }}
        /> */}
        <Text fontSize={30} fontWeight="bold">
          그럼,
        </Text>
        <Text fontSize={30} fontWeight="bold">
          모험을 시작해볼까요?
        </Text>
        <TitleStarPositioner>
          <StarSVG />
        </TitleStarPositioner>
      </Title>

      <Spacing gap={60} />
      <HikingSVG />

      <PositionBottom>
        <Button
          title="카카오 로그인"
          backgroundColor="kakaoYellow"
          color="black"
          fullWidth
        />
        <Spacing gap={16} />
        <AppleLoginButton />
      </PositionBottom>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 25px;
  align-items: center;
`;

const Title = styled.View`
  position: relative;
  width: 100%;
`;

const TitleStarPositioner = styled.View`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0px, -12px);
`;

export default LoginScreen;
