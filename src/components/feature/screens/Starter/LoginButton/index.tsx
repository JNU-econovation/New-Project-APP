import PositionBottom from "@components/common/shared/layout/PositionBottom";
import Button from "@components/common/shared/ui/Button";
import { Image, View } from "react-native";

const LoginButton = () => {
  // 로그인 페이지로 이동

  return (
    <>
      <PositionBottom paddingInline={20} bottom={50}>
        <Image
          source={require("@assets/images/buttonRoute.png")}
          style={{
            width: 65,
            height: 65,
            alignSelf: "flex-end",
            // paddingHorizontal: 100,
          }}
        />
        <Button title="로그인 하러 가기" fullWidth />
      </PositionBottom>
    </>
  );
};

export default LoginButton;
