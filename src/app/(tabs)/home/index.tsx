import Spacing from "@components/common/shared/layout/Spacing";
import HomeCanvas from "@components/feature/screens/Home/HomeCanvas";
import HomeHeaderSection from "@components/feature/screens/Home/HomeHeaderSection";
import HomeNavGridSection from "@components/feature/screens/Home/HomeNavGridSection";
import styled from "@emotion/native";

const HomeScreen = () => {
  return (
    <Screen>
      <Container>
        <Spacing gap={20} />
        <HomeHeaderSection />
        <Spacing gap={20} />
        <HomeCanvas />
        <HomeNavGridSection />
        <Spacing gap={20} />
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
