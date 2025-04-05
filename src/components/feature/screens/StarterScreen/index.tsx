import CarouselView from "@components/common/entities/CarouselView";
import PositionBottom from "@components/common/shared/layout/PositionBottom";
import Button from "@components/common/shared/ui/Button";
import styled from "@emotion/native";
import { View } from "react-native";

const StarterScreen = () => {
  return (
    <Container>
      <CarouselView
        loop
        width={300}
        height={200}
        data={[1, 2, 3]}
        renderItem={(item) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
            }}
          >
            <StyledText>{item}</StyledText>
          </View>
        )}
      />
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
