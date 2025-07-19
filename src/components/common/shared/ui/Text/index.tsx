import { COLORS } from "@styles/colorPalette";
import styled from "@emotion/native";

interface TextProps {
  fontSize?: number;
  color?: keyof typeof COLORS;
  fontWeight?:
    | "normal"
    | "bold"
    | "black"
    | "extrabold"
    | "extralight"
    | "light"
    | "medium"
    | "semibold"
    | "thin";
  textAlign?: string;
  opacity?: number;
  italic?: boolean;
}

export default styled.Text<TextProps>`
  font-size: ${({ fontSize = 16 }) => `${fontSize}px`};
  color: ${({ color = "black" }) => COLORS[color]};
  font-family: ${({ fontWeight = "regular" }) => `pretendard-${fontWeight}`};
  text-align: ${({ textAlign = "left" }) => textAlign};
  opacity: ${({ opacity = 1 }) => opacity};
  font-style: ${({ italic: Italic }) => (Italic ? "italic" : "normal")};
  ${({ italic }) => italic && "transform: skewX(-18deg);"}
`;
