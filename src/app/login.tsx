import WebViewWithInjected from "@components/common/entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";
import styled from "@emotion/native";

const LoginScreen = () => {
  return (
    <Container>
      <View>
        <WebViewWithInjected
          source={{
            uri: PATH_ROUTE.WEBVIEW.LOGIN,
          }}
        />
      </View>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const View = styled.View`
  flex: 1;
  padding: 30px;
`;

export default LoginScreen;
