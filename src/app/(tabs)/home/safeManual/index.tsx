import styled from "@emotion/native";
import SafeManualWebview from "@screens/SafeManual/SafeManualWebview";
import { COLORS } from "@styles/colorPalette";

const SafeManualScreen = () => {
  return (
    <Container>
      <SafeManualWebview />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.mainWhite};
`;

export default SafeManualScreen;
