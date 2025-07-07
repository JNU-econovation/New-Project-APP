import styled from "@emotion/native";
import useAppleLoginMutate from "@hooks/feature/query/useAppleLoginMutate";
import Button from "@shared/ui/Button";
import { AppleSVG } from "@shared/ui/Icons";
import * as AppleAuthentication from "expo-apple-authentication";
import { router } from "expo-router";
import { useCallback } from "react";

const AppleLoginButton = () => {
  const { mutate } = useAppleLoginMutate();

  const login = useCallback(async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // AppleAuthentication.AppleAuthenticationOperation.LOGOUT;

      if (!credential.identityToken || !credential.authorizationCode) {
        throw new Error("Invalid credential");
      }

      const { identityToken, email, fullName } = credential;

      console.log("애플 로그인 요청", credential);

      mutate(
        {
          identityToken,
          email: email || "",
          fullName: {
            familyName: fullName?.familyName || "",
            givenName: fullName?.givenName || "",
          },
        },
        {
          onSuccess: () => {
            router.dismissAll();
            router.replace("/(tabs)/home");
          },
          onError: (error) => {
            console.error("애플 로그인 요청 에러", error);
          },
        },
      );
    } catch (e) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        console.error("애플 로그인 요청이 취소되었습니다.");
      } else {
        // handle other errors
      }
    }
  }, []);

  return (
    <Container>
      <Button
        title="apple로 계속하기"
        backgroundColor="black"
        color="mainWhite"
        startIcon={<AppleSVG />}
        fullWidth
        onPress={login}
      />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
`;

export default AppleLoginButton;
