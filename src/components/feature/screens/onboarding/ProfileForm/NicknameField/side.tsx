import DefaultButton from "@shared/ui/buttons/DefaultButton";
import styled from "@emotion/native";
import { useProfileSetFormContext } from "@hooks/feature/form/useProfileSetForm";
import useCheckNicknameDuplicatedMutate from "@hooks/feature/query/mutate/useCheckNicknameDuplicatedMutate";

const InputRightSideContainer = styled.View`
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 8px;
`;

const NicknameFieldContentSideButtonWithCheckDuplicated = () => {
  const { getValues, setValue, watch } = useProfileSetFormContext();

  const { mutate: checkNicknameDuplicated } =
    useCheckNicknameDuplicatedMutate();

  const handleEmailSubmit = () => {
    if (watch("nicknameFieldHelperState") !== "FIT") return;

    checkNicknameDuplicated(
      { nickname: getValues("nickname") },
      {
        onSuccess: ({ isDuplicated }) => {
          if (isDuplicated) {
            setValue("nicknameFieldHelperState", "DUPLICATED");
            return;
          }

          setValue("nicknameFieldHelperState", "SUCCESS");
          setValue("nickname", getValues("nickname"));
        },
      },
    );
  };

  return (
    <InputRightSideContainer>
      <DefaultButton
        title={"확인"}
        color="mainWhite"
        fontSize={14}
        paddingHorizontal={12}
        paddingVertical={8}
        fullWidth
        onPress={handleEmailSubmit}
        disabled={watch("nicknameFieldHelperState") !== "FIT"}
      />
    </InputRightSideContainer>
  );
};

export default NicknameFieldContentSideButtonWithCheckDuplicated;
