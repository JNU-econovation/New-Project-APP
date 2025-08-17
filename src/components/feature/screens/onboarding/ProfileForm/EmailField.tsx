import { COLORS } from "@styles/colorPalette";

import TextAreaField from "@components/common/shared/ui/TextareaField";
import { useProfileSetFormContext } from "@hooks/feature/form/useProfileSetForm";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";

const emailSchema = z.string().email("올바른 이메일 주소를 입력해 주세요.");

const helperText = {
  duplicated: "이미 가입된 이메일입니다.",
  invalid: "올바른 이메일 주소를 입력해 주세요.",
  none: undefined,
  fit: undefined,
};

const EmailField = () => {
  const { control, getValues, setValue } = useProfileSetFormContext();
  const [helperState, setHelperState] =
    useState<keyof typeof helperText>("none");

  const checkEmail = (email: string) => {
    const result = emailSchema.safeParse(email);

    if (email.length === 0) {
      setHelperState("none");
      return;
    }

    if (result.success) {
      setHelperState("fit");
      return;
    }

    setHelperState("invalid");
  };

  return (
    <Controller
      name="email"
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextAreaField
          title="이메일"
          titleSpacing={0}
          placeholder="입력하기"
          backgroundColor="inputGray"
          borderColor="inputGray"
          paddingVertical={16}
          placeholderTextColor={COLORS.subGray}
          helperText={helperText[helperState]}
          onChangeText={(email) => {
            checkEmail(email);
            onChange(email);
          }}
          value={value}
          maxLength={12}
          helperTextProps={{
            color: "error",
          }}
        />
      )}
    />
  );
};

export default EmailField;
