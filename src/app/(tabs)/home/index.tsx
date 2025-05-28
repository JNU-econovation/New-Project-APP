import Spacing from "@shared/layout/Spacing";
import HomeCanvas from "@screens/Home/HomeCanvas";
import HomeHeaderSection from "@screens/Home/HomeHeaderSection";
import HomeNavGridSection from "@screens/Home/HomeNavGridSection";
import styled from "@emotion/native";

const HomeScreen = () => {
  return (
    <Screen>
      <Container>
        <Spacing size={20} />
        <HomeHeaderSection />
        <Spacing size={20} />
        <HomeCanvas />
        <HomeNavGridSection />
        <Spacing size={20} />
      </Container>
    </Screen>
  );
};

const Screen = styled.SafeAreaView`
  flex: 1;
  background-color: #efefef;
`;

const Container = styled.View`
  flex: 1;
  padding-inline: 20px;
`;

export default HomeScreen;
