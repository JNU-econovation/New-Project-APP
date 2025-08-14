import styled from "@emotion/native";
import { useNoticeBar } from "@service/notice-bar";
import Spacing from "@shared/layout/Spacing";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import Text from "@shared/ui/Text";
import TextAreaField from "@shared/ui/TextareaField";
import { useEffect, useRef, useState } from "react";
import * as z from "zod";

const timestampToMinutesSeconds = (ms: number) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const OnboardFormSection = () => {
  const verificationRef = useRef({ deadline: 0 });
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeSent, setVerificationCodeSent] = useState(0);

  const [verificationDeadlineTimer, setVerificationDeadlineTimer] = useState(0);

  const { showNotice } = useNoticeBar();

  const emailSchema = z.string().trim().email();
  const verificationCodeSchema = z
    .string()
    .regex(/^\d{6}$/, "인증 번호는 숫자 6자리입니다.");

  // 타이머를 위한
  useEffect(() => {
    //TODO: verificationDeadlineTimer가 하나 증가할 때 top알림창 뜨도록

    const timer = setInterval(() => {
      const verificationDeadline = verificationRef.current.deadline;
      setVerificationDeadlineTimer(verificationDeadline - Date.now());
    }, 1000);

    return () => clearTimeout(timer);
  }, [setVerificationDeadlineTimer]);

  // 이메일 인증 요청 버튼 클릭 시
  const handleEmailSubmit = () => {
    const isValid = emailSchema.safeParse(email).success;
    if (!isValid) {
      alert("유효하지 않은 이메일입니다.");
      return;
    }

    //TODO:
    // mutate 메일 전송 요청
    // onSuccess : noti & 타이머
    // onError : 이메일 전송 실패 Alert ?? => 인액터스에게 물어보기

    verificationRef.current.deadline = Date.now() + 5 * 60 * 1000;
    setVerificationCodeSent((prev) => prev + 1);

    showNotice({
      message: "📬 작성한 메일로 인증번호를 전송했습니다.",
      duration: 2500,
    });
  };

  const handleVerificationCodeSubmit = () => {
    const isValid = verificationCodeSchema.safeParse(verificationCode).success;
    if (!isValid) {
      alert("인증 번호가 유효하지 않습니다.");
      return;
    }

    //TODO:
    // mutate
    // onSuccess : 다음 페이지로 이동
    // onError : 인증번호가 일치하지 않습니다 Alert
    // onSettled : button disabled

    // alert("인증번호가 일치하지 않습니다.");
  };

  return (
    <>
      <TextAreaField
        title="이메일"
        titleSpacing={0}
        placeholder="입력하기"
        backgroundColor="inputGray"
        borderColor="inputGray"
        paddingVertical={16}
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        helperText={
          email && emailSchema.safeParse(email).error
            ? "존재하지 않는 이메일입니다."
            : ""
        }
        helperTextSpacing={12}
        helperTextProps={{
          fontSize: 14,
          color: "mainRed",
        }}
        contentSideComponent={
          <InputRightSideContainer>
            <DefaultButton
              title={verificationCodeSent == 0 ? "인증 요청" : "재요청"}
              color="mainWhite"
              fontSize={14}
              paddingHorizontal={12}
              paddingVertical={8}
              onPress={handleEmailSubmit}
              disabled={!emailSchema.safeParse(email).success}
            />
          </InputRightSideContainer>
        }
      />

      <Spacing size={39} />

      <TextAreaField
        title="인증 번호"
        titleSpacing={0}
        placeholder="입력하기"
        backgroundColor="inputGray"
        borderColor="inputGray"
        paddingVertical={16}
        keyboardType="number-pad"
        onChangeText={setVerificationCode}
        value={verificationCode}
        maxLength={6}
        editable={!!verificationCodeSent}
        contentSideComponent={
          verificationCodeSent > 0 && (
            <InputRightSideContainer>
              <Text fontSize={16} fontWeight="medium">
                {verificationDeadlineTimer <= 0 || verificationCodeSent === 0
                  ? "00:00"
                  : timestampToMinutesSeconds(verificationDeadlineTimer)}
              </Text>
            </InputRightSideContainer>
          )
        }
      />
      {!!verificationCodeSent && (
        <DefaultButton
          title="확인하기"
          color="mainWhite"
          fontSize={16}
          paddingVertical={16}
          onPress={handleVerificationCodeSubmit}
          disabled={!verificationCodeSchema.safeParse(verificationCode).success}
        />
      )}
    </>
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

export default OnboardFormSection;
