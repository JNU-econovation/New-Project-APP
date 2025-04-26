import Button from "@components/common/shared/ui/Button";
import { AppleSVG } from "@components/common/shared/ui/Icons";
import styled from "@emotion/native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useCallback } from "react";

const AppleLoginButton = () => {
  const login = useCallback(async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log(credential);
      // signed in
    } catch (e) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
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
