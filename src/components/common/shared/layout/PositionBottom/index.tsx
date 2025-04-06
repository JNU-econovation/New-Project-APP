import styled from "@emotion/native";
import { PropsWithChildren } from "react";

const BOTTOM_SPACE = 50; // 하단 여백

interface PositionBottomStyleProps {
  bottom?: number;
  paddingInline?: number;
}

interface PositionBottomProps
  extends PositionBottomStyleProps,
    PropsWithChildren {}

const PositionBottom = ({
  children,
  bottom,
  paddingInline,
}: PositionBottomProps) => {
  return (
    <Container bottom={bottom} paddingInline={paddingInline}>
      {children}
    </Container>
  );
};

const Container = styled.View<PositionBottomStyleProps>`
  position: absolute;
  padding-inline: ${({ paddingInline }) => paddingInline || 0}px;
  bottom: ${({ bottom }) => bottom || BOTTOM_SPACE}px;
  left: 0;
  right: 0;
  align-items: center;
`;

export default PositionBottom;
