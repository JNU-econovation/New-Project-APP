import styled from "@emotion/native";
import SafeManualDetailWebview from "@screens/SafeManual/SafeManualDetailWebview";
import { COLORS } from "@styles/colorPalette";

const SafeManualDetailScreen = () => {
  return (
    <Container>
      <SafeManualDetailWebview />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.mainWhite};
`;

export default SafeManualDetailScreen;
