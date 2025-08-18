const PROFILE_FORM = {
  NICKNAME: {
    SUCCESS: "사용 가능한 닉네임입니다.",
    DUPLICATED: "이미 사용 중인 닉네임입니다.",
    INVALID: "공백 없이 12자 이내 한글, 영문, 숫자만 입력 가능",
    NONE: undefined,
    FIT: undefined,
  },
} as const;

const HELPER = Object.freeze({ PROFILE_FORM });

export default HELPER;
