import HELPER from "@constants/inputField/helper";
import { useForm, useFormContext } from "react-hook-form";

interface ProfileFormValues {
  nickname: string;
  phoneNumber: string;
  verificationCode: string;
  email: string;

  // meta
  isNicknameValid: boolean;
  nicknameFieldHelperState: keyof typeof HELPER.PROFILE_FORM.NICKNAME;

  phoneNumberVerificationCount: number;
  isPhoneNumberValid: boolean;
  verificationDeadline: number;
}

const useProfileSetForm = () => {
  return useForm<ProfileFormValues>({
    defaultValues: {
      // form field
      nickname: "",
      phoneNumber: "010-",
      verificationCode: "",
      email: "",

      // meta
      isNicknameValid: false,
      isPhoneNumberValid: false,
      phoneNumberVerificationCount: 0,
    },
  });
};

export const useProfileSetFormContext = () => {
  return useFormContext<ProfileFormValues>();
};

export default useProfileSetForm;
