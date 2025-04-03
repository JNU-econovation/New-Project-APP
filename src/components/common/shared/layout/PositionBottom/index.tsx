import styled from "@emotion/native";
import { PropsWithChildren } from "react";

interface PositionBottomProps extends PropsWithChildren {}

const PositionBottom = ({ children }: PositionBottomProps) => {
  return <Container>{children}</Container>;
};

const Container = styled.View`
  position: absolute;
  bottom: 50;
  left: 0;
  right: 0;
  padding: 10px;
  align-items: center;
`;

export default PositionBottom;
