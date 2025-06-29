import styled from "@emotion/native";
import MountainCourseWebview from "@screens/course/MountainCourseWebview";

const MountainCourseScreen = () => {
  return (
    <Container>
      <MountainCourseWebview />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

export default MountainCourseScreen;
