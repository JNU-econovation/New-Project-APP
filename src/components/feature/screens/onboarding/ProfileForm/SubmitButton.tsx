import { useProfileSetFormContext } from "@hooks/feature/form/useProfileSetForm";
import PositionBottom from "@shared/layout/PositionBottom";
import DefaultButton from "@shared/ui/buttons/DefaultButton";

const SubmitButton = () => {
  const { getValues, setValue } = useProfileSetFormContext();

  const handleSubmit = () => {
    const {
      nickname,
      phoneNumber,
      email,
      isNicknameValid,
      isPhoneNumberValid,
      verificationCode,
    } = getValues();

    // nickname validation
    if (!nickname) setValue("nicknameFieldHelperState", "REQUIRE");
    if (!isNicknameValid)
      setValue("nicknameFieldHelperState", "NEED_VERIFICATION");

    // phone number validation
    if (!phoneNumber) setValue("phoneNumberFieldHelperState", "REQUIRE");
    if (!isPhoneNumberValid)
      setValue("phoneNumberFieldHelperState", "NEED_VERIFICATION");

    // verification code validation
    if (!verificationCode) setValue("verificationFieldHelperState", "REQUIRE");

    if (!email) setValue("emailFieldHelperState", "REQUIRE");

    console.log({ email, nickname, phoneNumber });
  };

  return (
    <PositionBottom>
      <DefaultButton
        title="완료"
        color="mainWhite"
        fullWidth
        onPress={handleSubmit}
      />
    </PositionBottom>
  );
};

export default SubmitButton;
