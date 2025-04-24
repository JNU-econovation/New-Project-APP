import PositionBottom from "@components/common/shared/layout/PositionBottom";
import Button from "@components/common/shared/ui/Button";
import { router } from "expo-router";

import { Image } from "react-native";

const LoginButton = () => {
  return (
    <PositionBottom paddingInline={20} bottom={50}>
      <Image
        source={require("@assets/images/buttonRoute.png")}
        style={{
          width: 65,
          height: 65,
          alignSelf: "flex-end",
        }}
      />
      <Button
        title="로그인 하러 가기"
        fullWidth
        onPress={() => {
          router.push("/login");
        }}
      />
    </PositionBottom>
  );
};

LoginButton.OCCUPY_SPACE = PositionBottom.BOTTOM_SPACE + 100;

export default LoginButton;
