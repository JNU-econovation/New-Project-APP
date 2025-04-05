import PositionBottom from "@components/common/shared/layout/PositionBottom";
import Button from "@components/common/shared/ui/Button";
import styled from "@emotion/native";
import { useSharedValue } from "react-native-reanimated";

const StarterScreen = () => {
  const width = useSharedValue(0);

  return (
    <Container>
      <StyledText>Hello, this is the starter screen!</StyledText>
      <StyledImage source={require("@/assets/images/react-logo.png")} />
      <PositionBottom>
        <Button title="로그인 하러 가기" fullWidth />
      </PositionBottom>
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

const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-top: 20px;
`;

export default StarterScreen;
