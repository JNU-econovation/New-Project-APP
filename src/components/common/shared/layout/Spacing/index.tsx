import styled from "@emotion/native";

interface SpacingProps {
  gap?: number;
}

const Spacing = styled.View<SpacingProps>`
  margin-top: ${({ gap }) => (gap ? `${gap}px` : "0")};
`;

export default Spacing;
