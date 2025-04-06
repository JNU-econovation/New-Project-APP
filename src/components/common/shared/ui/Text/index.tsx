import styled, { css } from "@emotion/native";
import { COLORS } from "@/src/styles/colorPalette";

interface TextProps {
  fontSize?: number;
  color?: keyof typeof COLORS;
  fontWeight?: string;
  textAlign?: string;
}

export default styled.Text<TextProps>`
  font-size: ${({ fontSize = 16 }) => `${fontSize}px`};
  color: ${({ color = "mainGreen" }) => COLORS[color]};
  font-weight: ${({ fontWeight = "normal" }) => fontWeight};
  text-align: ${({ textAlign = "left" }) => textAlign};
`;
