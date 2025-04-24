import styled from "@emotion/native";
import LoginButton from "../LoginButton";
import ExplainCarousel from "../ExplainCarousel";
import { COLORS } from "@/src/styles/colorPalette";

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
  background-color: ${COLORS.mainWhite};
`;

export default StarterScreen;
