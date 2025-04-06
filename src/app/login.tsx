import Text from "@components/common/shared/ui/Text";
import PATH_ROUTE from "@constants/pathRoute";
import styled from "@emotion/native";
import { WebView } from "react-native-webview";

const LoginScreen = () => {
  return (
    <Container>
      <Text>Login</Text>
      <WebView
        source={{
          uri: PATH_ROUTE.WEBVIEW.LOGIN,
        }}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

export default LoginScreen;
