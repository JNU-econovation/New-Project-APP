import styled from "@emotion/native";
import { useProfileSetFormContext } from "@hooks/feature/form/useProfileSetForm";
import useSMSForVerificationMutate from "@hooks/feature/query/mutate/useSMSForVerificationMutate";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import TextAreaField from "@shared/ui/TextareaField";
import { COLORS } from "@styles/colorPalette";
import { formatPhoneNumberLive, isValidPhoneNumber } from "@utils/phoneNumber";
import { Controller } from "react-hook-form";
import { Keyboard } from "react-native";

const PhoneNumberField = () => {
  const { control, getValues, watch, setValue } = useProfileSetFormContext();
  const { mutate: sendSMSVerification } = useSMSForVerificationMutate();

  const handlePhoneNumberVerification = () => {
    const phoneNumber = getValues("phoneNumber");
    Keyboard.dismiss();
    if (isValidPhoneNumber(phoneNumber)) {
      sendSMSVerification(phoneNumber, {
        onSuccess: () => {
          setValue("verificationDeadline", Date.now() + 1000 * 60 * 5); //5 min
          setValue(
            "phoneNumberVerificationCount",
            watch("phoneNumberVerificationCount") + 1,
          );
        },
      });
    }
  };

  return (
    <Controller
      name="phoneNumber"
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextAreaField
          title="전화번호"
          titleSpacing={0}
          placeholder="입력하기"
          backgroundColor="inputGray"
          borderColor="inputGray"
          paddingVertical={16}
          placeholderTextColor={COLORS.subGray}
          // helperText={helperText[helperState]}
          onChangeText={(phoneNumber) => {
            if (watch("isPhoneNumberValid")) {
              return;
            }
            if (phoneNumber.length <= 4) {
              onChange("010-");
              Keyboard.dismiss();
              return;
            }
            const formatted = formatPhoneNumberLive(phoneNumber);
            onChange(formatted);
          }}
          keyboardType="number-pad"
          value={value}
          maxLength={13}
          editable={!watch("isPhoneNumberValid")}
          // helperTextProps={{
          //   color: helperState === "success" ? "success" : "error",
          // }}
          contentSideComponent={
            <InputRightSideContainer>
              <DefaultButton
                title={
                  watch("phoneNumberVerificationCount") === 0
                    ? "인증요청"
                    : "재전송"
                }
                color="mainWhite"
                fontSize={14}
                paddingHorizontal={12}
                paddingVertical={8}
                onPress={handlePhoneNumberVerification}
                disabled={
                  isValidPhoneNumber(value) === false ||
                  watch("isPhoneNumberValid")
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

export default PhoneNumberField;
