import Text from "@components/common/shared/ui/Text";
import { TouchableOpacity, View } from "react-native";

const LoginModalScreen = () => {
  return (
    <View style={{}}>
      <TouchableOpacity
        // onPress={closeModal}
        style={{
          opacity: 1,
        }}
      >
        <Text>로그인 성공</Text>
        <Text>로그인 실패</Text>
        <Text>로그인 취소</Text>
        <Text>로그인 에러</Text>
        <Text>로그인 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginModalScreen;
