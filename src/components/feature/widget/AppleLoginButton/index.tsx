import Button from "@components/common/shared/ui/Button";
import { AppleSVG } from "@components/common/shared/ui/Icons";
import styled from "@emotion/native";
import useAppleLoginMutate from "@hooks/feature/query/useAppleLoginMutate";
import { setValueToSecureStore } from "@utils/secureStore";
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

      if (!credential.identityToken || !credential.authorizationCode) {
        throw new Error("Invalid credential");
      }

      console.log(credential);

      //TODO: 로그인 플로우를 확인하기 위한 임시 코드
      {
        await setValueToSecureStore("accessToken", credential.identityToken);
        await setValueToSecureStore(
          "refreshToken",
          credential.authorizationCode,
        );
      }

      mutate(
        {
          authorizationCode: credential.authorizationCode,
          identityToken: credential.identityToken,
        },
        {
          //TODO: 로그인 플로우를 확인하기 위한 임시 코드
          onSettled() {
            router.back();
            router.replace("/(tabs)/home");
          },
        },
      );
    } catch (e) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        console.log("User canceled the sign-in flow");
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
