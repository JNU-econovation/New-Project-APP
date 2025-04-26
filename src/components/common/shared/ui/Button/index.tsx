import { COLORS } from "@/src/styles/colorPalette";
import styled from "@emotion/native";
interface ButtonStyledProps {
  fullWidth?: boolean;
  disabled?: boolean;
  backgroundColor?: keyof typeof COLORS;
  color?: keyof typeof COLORS;
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
      <StyledText color={color}>{title}</StyledText>
    </StyledTouchableOpacity>
  );
};

const StyledTouchableOpacity = styled.TouchableOpacity<ButtonStyledProps>(
  ({ fullWidth, disabled, backgroundColor, color }) => ({
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
    color: color ? COLORS[color] : COLORS.black,
  }),
);

const StyledText = styled.Text<ButtonStyledProps>`
  color: ${({ color }) => (color ? COLORS[color] : COLORS.black)};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export default Button;
