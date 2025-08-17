import styled from "@emotion/native";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import { COLORS } from "@styles/colorPalette";

import TextAreaField from "@components/common/shared/ui/TextareaField";
import { useProfileSetFormContext } from "@hooks/feature/form/useProfileSetForm";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";

const nicknameSchema = z
  .string()
  .min(2)
  .max(12)
  .regex(
    /^[가-힣a-zA-Z0-9]{1,12}$/,
    "공백 없이 12자 이내 한글, 영문, 숫자만 입력 가능",
  );

const helperText = {
  success: "사용 가능한 닉네임입니다.",
  duplicated: "이미 사용 중인 닉네임입니다.",
  invalid: "공백 없이 12자 이내 한글, 영문, 숫자만 입력 가능",
  none: undefined,
  fit: undefined,
};

const NicknameField = () => {
  const { control, getValues, setValue } = useProfileSetFormContext();
  const [helperState, setHelperState] =
    useState<keyof typeof helperText>("none");

  const checkNickname = (nickname: string) => {
    const result = nicknameSchema.safeParse(nickname);

    if (nickname.length === 0) {
      setHelperState("none");
      return;
    }

    if (result.success) {
      setHelperState("fit");
      return;
    }

    setHelperState("invalid");
  };

  const handleEmailSubmit = () => {
    if (helperState !== "fit") return;

    // 이메일 중복 확인 로직
    // 중복시 helperstate -> "duplicated"
    // 중복이 아닐 경우 helperstate -> "success"

    if (Date.now() % 2 === 0) {
      setHelperState("duplicated");
      return;
    }

    setHelperState("success");
    setValue("nickname", getValues("nickname"));
  };

  return (
    <Controller
      name="nickname"
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextAreaField
          title="닉네임"
          titleSpacing={0}
          placeholder="입력하기"
          backgroundColor="inputGray"
          borderColor="inputGray"
          paddingVertical={16}
          placeholderTextColor={COLORS.subGray}
          helperText={helperText[helperState]}
          onChangeText={(text) => {
            checkNickname(text);
            onChange(text);
          }}
          value={value}
          maxLength={12}
          helperTextProps={{
            color: helperState === "success" ? "success" : "error",
          }}
          contentSideComponent={
            <InputRightSideContainer>
              <DefaultButton
                title={"확인"}
                color="mainWhite"
                fontSize={14}
                paddingHorizontal={12}
                paddingVertical={8}
                onPress={handleEmailSubmit}
                disabled={helperState !== "fit"}
              />
            </InputRightSideContainer>
          }
        />
      )}
    />
  );
};

const InputRightSideContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 8px;
`;

export default NicknameField;
