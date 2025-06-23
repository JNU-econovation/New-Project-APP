import styled from "@emotion/native";
import { COLORS } from "@styles/colorPalette";

interface StyledTextInputProps {
  backgroundColor?: keyof typeof COLORS;
  width?: string | number;
  height?: string | number;
  fontSize?: number;
  color?: keyof typeof COLORS;
}

const Textarea = styled.TextInput<StyledTextInputProps>`
  border: 1px solid ${COLORS.subGray};
  border-radius: 8px;
  padding: 12px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? COLORS[backgroundColor] : COLORS.mainWhite};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "16px")};
  color: ${({ color }) => (color ? COLORS[color] : COLORS.black)};
`;

export default Textarea;
