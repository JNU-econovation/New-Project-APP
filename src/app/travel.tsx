import styled from "@emotion/native";
import TravelWebview from "@screens/travel/TravelWebview";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { useEffect, useState } from "react";

const TravelScreen = () => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 1) {
          return prevCount - 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Screen count={count}>
      <Container>
        <WebviewContainer count={count}>
          <TravelWebview />
        </WebviewContainer>

        <CounterContainer count={count}>
          <Spacing size={50} />
          <Text color="mainWhite" fontSize={96} fontWeight="bold" Italic>
            {count}
          </Text>
          <Spacing size={50} />
          <Text color="mainWhite" fontSize={20} fontWeight="bold">
            무리하지 말고,
          </Text>
          <Spacing size={10} />
          <Text color="mainWhite" fontSize={20} fontWeight="bold">
            자신의 페이스를 지키세요.
          </Text>
        </CounterContainer>
      </Container>
    </Screen>
  );
};

const Screen = styled.SafeAreaView<{ count: number }>`
  flex: 1;
  background-color: ${({ count }) =>
    count === 0 ? COLORS.mainWhite : COLORS.mainGreen};
`;

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.mainGreen};
  position: relative;
`;

const CounterContainer = styled.View<{ count: number }>`
  flex: ${(props) => (props.count === 0 ? 0 : 1)};
  height: ${(props) => (props.count === 0 ? "0" : "100%")};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: inherit;
`;

const WebviewContainer = styled.View<{ count: number }>`
  flex: ${({ count }) => (count === 0 ? 1 : 0)};
  height: ${({ count }) => (count === 0 ? "100%" : "0")};
  display: absolute;
  top: 0;
  left: 0;
  z-index: ${({ count }) => (count === 0 ? "10" : "-10")};
  transition: all 3s ease-in-out;
`;

export default TravelScreen;
