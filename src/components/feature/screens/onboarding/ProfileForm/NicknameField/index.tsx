import HELPER from "@constants/inputField/helper";
import { useProfileSetFormContext } from "@hooks/feature/form/useProfileSetForm";
import useRandomNicknameQuery from "@hooks/feature/query/query/useRandomNicknameQuery";
import TextAreaField from "@shared/ui/TextareaField";
import { COLORS } from "@styles/colorPalette";
import { Suspense } from "@suspensive/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";
import NicknameFieldContentSideButton from "./side";

const nicknameSchema = z
  .string()
  .min(2)
  .max(12)
  .regex(
    /^[가-힣a-zA-Z0-9]{1,12}$/,
    "공백 없이 12자 이내 한글, 영문, 숫자만 입력 가능",
  );

const NicknameField = Suspense.with(
  {
    fallback: <TextAreaField.loader />,
  },
  () => {
    const { control, getValues, setValue, watch } = useProfileSetFormContext();

    const {
      data: { nickname: randomNickname },
    } = useRandomNicknameQuery();

    const checkNickname = (nickname: string) => {
      const result = nicknameSchema.safeParse(nickname);

      if (nickname.length === 0) {
        setValue("nicknameFieldHelperState", "NONE");
        return;
      }

      if (result.success) {
        setValue("nicknameFieldHelperState", "FIT");
        return;
      }

      setValue("nicknameFieldHelperState", "INVALID");
    };

    useEffect(() => {
      setValue("nickname", randomNickname);
    }, [randomNickname]);

    return (
      <Controller
        name="nickname"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextAreaField
            title="닉네임"
            titleSpacing={0}
            placeholder={randomNickname}
            backgroundColor="inputGray"
            borderColor="inputGray"
            paddingVertical={16}
            placeholderTextColor={COLORS.subGray}
            helperText={
              HELPER.PROFILE_FORM.NICKNAME[watch("nicknameFieldHelperState")]
            }
            onChangeText={(text) => {
              checkNickname(text);
              onChange(text);
            }}
            value={value}
            maxLength={12}
            helperTextProps={{
              color:
                watch("nicknameFieldHelperState") === "FIT" ||
                watch("nicknameFieldHelperState") === "SUCCESS"
                  ? "success"
                  : "error",
            }}
            contentSideComponent={<NicknameFieldContentSideButton />}
          />
        )}
      />
    );
  },
);

export default NicknameField;
