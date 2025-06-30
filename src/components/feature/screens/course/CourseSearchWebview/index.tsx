import PATH_ROUTE from "@constants/pathRoute";
import styled from "@emotion/native";
import WebViewWithInjected from "@entities/WebViewWithInjected";

const CourseSearchWebview = () => {
  return (
    <Container>
      <WebViewWithInjected source={{ uri: PATH_ROUTE.WEBVIEW.COURSE_SEARCH }} />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

export default CourseSearchWebview;
