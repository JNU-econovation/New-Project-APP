import styled from "@emotion/native";
import { COLORS } from "@styles/colorPalette";

interface StyledTextInputProps {
  backgroundColor?: keyof typeof COLORS;
}

const Textarea = styled.TextInput<StyledTextInputProps>`
  border: 1px solid ${COLORS.gray200};
  border-radius: 8px;
  padding: 12px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? COLORS[backgroundColor] : COLORS.mainWhite};
`;

export default Textarea;
