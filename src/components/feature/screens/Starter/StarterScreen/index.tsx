import styled from "@emotion/native";
import LoginButton from "../LoginButton";
import ExplainCarousel from "../ExplainCarousel";

const StarterScreen = () => {
  return (
    <Container>
      <ExplainCarousel />
      <LoginButton />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 20px;
  color: #333;
`;

export default StarterScreen;
