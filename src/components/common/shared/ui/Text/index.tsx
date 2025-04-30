import { COLORS } from "@/src/styles/colorPalette";
import styled from "@emotion/native";

interface TextProps {
  fontSize?: number;
  color?: keyof typeof COLORS;
  fontWeight?: string;
  textAlign?: string;
  opacity?: number;
}

export default styled.Text<TextProps>`
  font-size: ${({ fontSize = 16 }) => `${fontSize}px`};
  color: ${({ color = "black" }) => COLORS[color]};
  font-weight: ${({ fontWeight = "normal" }) => fontWeight};
  text-align: ${({ textAlign = "left" }) => textAlign};
  opacity: ${({ opacity = 1 }) => opacity};
`;
