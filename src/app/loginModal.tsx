import LoginWebView from "@components/feature/widget/LoginWebView";
import styled from "@emotion/native";

const LoginModalScreen = () => {
  return (
    <Container>
      <LoginWebView />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  position: relative;
`;

export default LoginModalScreen;
