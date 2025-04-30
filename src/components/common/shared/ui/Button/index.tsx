import { COLORS } from "@/src/styles/colorPalette";
import styled from "@emotion/native";
import { ReactNode } from "react";
interface ButtonStyledProps {
  fullWidth?: boolean;
  disabled?: boolean;
  backgroundColor?: keyof typeof COLORS;
  color?: keyof typeof COLORS;
  fontSize?: number;
  startIcon?: ReactNode;
  fontWeight?: "bold";
}

interface ButtonProps extends ButtonStyledProps {
  title: string;
  onPress?: () => void;
}

const Button = ({
  title,
  fullWidth,
  backgroundColor,
  disabled,
  color,
  fontSize,
  startIcon,
  onPress,
}: ButtonProps) => {
  return (
    <StyledTouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{ width: fullWidth ? "100%" : undefined }}
      backgroundColor={backgroundColor}
      activeOpacity={0.8}
    >
      {startIcon && startIcon}
      <StyledText color={color} fontSize={fontSize}>
        {title}
      </StyledText>
    </StyledTouchableOpacity>
  );
};

const StyledTouchableOpacity = styled.TouchableOpacity<ButtonStyledProps>(
  ({ fullWidth, disabled, backgroundColor }) => ({
    backgroundColor: backgroundColor
      ? COLORS[backgroundColor]
      : COLORS.mainGreen,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: fullWidth ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
    flexDirection: "row",
    gap: 12,
  }),
);

const StyledText = styled.Text<ButtonStyledProps>`
  color: ${({ color }) => (color ? COLORS[color] : COLORS.black)};
  font-size: ${({ fontSize }) => (fontSize ? fontSize + "px" : "16px")};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "bold")};
  text-align: center;
`;

export default Button;
