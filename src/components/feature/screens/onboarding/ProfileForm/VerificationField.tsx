import styled from "@emotion/native";
import { useProfileSetFormContext } from "@hooks/feature/form/useProfileSetForm";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import Text from "@shared/ui/Text";
import TextAreaField from "@shared/ui/TextareaField";
import { timestampToMinutesSeconds } from "@utils/time";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Keyboard } from "react-native";

const helperText = {
  none: undefined,
  require: "필수 입력 항목입니다.",
  success: "인증이 완료되었습니다.",
  error: "인증번호가 올바르지 않습니다.",
  timeout: "입력 시간이 초과되었습니다. 재요청해주세요.",
};

const VerificationField = () => {
  const { control, getValues, watch, setValue } = useProfileSetFormContext();
  const [verificationTimer, setVerificationTimer] = useState<number | null>(
    null,
  );
  const timerRef = useRef<number | null>(null);

  const [helperState, setHelperState] =
    useState<keyof typeof helperText>("none");

  const handlePhoneNumberVerification = () => {
    const verificationCode = getValues("verificationCode");
    if (verificationCode.length === 6) {
      Keyboard.dismiss();
      if (helperState !== "none") return;

      // 인증 요청 로직
      if (Date.now() % 2 === 0) {
        setHelperState("success");
        setValue("isPhoneNumberValid", true);
        return;
      }
      setHelperState("error");
      setValue("isPhoneNumberValid", false);
    }
  };

  useEffect(() => {
    if (watch("verificationDeadline")) {
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          const remainingTime = watch("verificationDeadline") - Date.now();
          if (remainingTime <= 0) {
            setVerificationTimer(null);
            setHelperState("timeout");
          } else {
            setVerificationTimer(remainingTime);
          }
        }, 100);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [watch("verificationDeadline"), watch("isPhoneNumberValid")]);

  return (
    <Controller
      name="verificationCode"
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextAreaField
          title="인증번호"
          titleSpacing={0}
          backgroundColor="inputGray"
          borderColor="inputGray"
          paddingVertical={16}
          helperText={helperText[helperState]}
          onChangeText={(verificationCode) => {
            if (watch("isPhoneNumberValid")) {
              return;
            }
            setHelperState("none");
            onChange(verificationCode);
            if (verificationCode.length === 6) {
              Keyboard.dismiss();
            }
          }}
          editable={
            !watch("isPhoneNumberValid") &&
            watch("phoneNumberVerificationCount") > 0
          }
          keyboardType="number-pad"
          value={`${value}`}
          maxLength={6}
          titleSideComponent={
            <Text>
              {verificationTimer !== null
                ? timestampToMinutesSeconds(verificationTimer)
                : ""}
            </Text>
          }
          helperTextProps={{
            color: helperState === "success" ? "success" : "error",
          }}
          contentSideComponent={
            <InputRightSideContainer>
              <DefaultButton
                title="확인"
                color="mainWhite"
                fontSize={14}
                paddingHorizontal={12}
                paddingVertical={8}
                onPress={handlePhoneNumberVerification}
                disabled={
                  watch("phoneNumberVerificationCount") === 0 ||
                  watch("verificationCode").length !== 6 ||
                  helperState !== "none"
                }
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

export default VerificationField;
