import Button from "@components/common/shared/ui/Button";
import { KakaoSVG } from "@components/common/shared/ui/Icons";
import styled from "@emotion/native";
import { router } from "expo-router";

const KakaoLoginButton = () => {
  const handleKakaoLogin = () =>
    router.push({
      pathname: "/loginModal",
      params: {
        type: "kakao",
      },
    });

  return (
    <Container>
      <Button
        title="카카오톡으로 3초만에 시작하기"
        backgroundColor="kakaoYellow"
        color="black"
        fullWidth
        startIcon={<KakaoSVG />}
        onPress={handleKakaoLogin}
      />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
`;

export default KakaoLoginButton;
