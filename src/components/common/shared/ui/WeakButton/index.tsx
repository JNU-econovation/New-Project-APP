import { COLORS } from "@/src/styles/colorPalette";
import styled from "@emotion/native";
import { ReactNode } from "react";

interface ButtonStyledProps {
  fullWidth?: boolean;
  disabled?: boolean;
  color?: keyof typeof COLORS;
  fontSize?: number;
  startIcon?: ReactNode;
  fontWeight?: "bold";
  borderColor?: keyof typeof COLORS;
  paddingVertical?: number;
  paddingHorizontal?: number;
}

interface WeakButtonProps extends ButtonStyledProps {
  title: string;
  onPress?: () => void;
}

const WeakButton = ({
  title,
  fullWidth,
  disabled,
  color,
  fontSize,
  startIcon,
  borderColor,
  onPress,
}: WeakButtonProps) => {
  return (
    <StyledTouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{ width: fullWidth ? "100%" : undefined }}
      activeOpacity={0.8}
      borderColor={borderColor}
    >
      {startIcon && startIcon}
      <StyledText color={color} fontSize={fontSize}>
        {title}
      </StyledText>
    </StyledTouchableOpacity>
  );
};

const StyledTouchableOpacity = styled.TouchableOpacity<ButtonStyledProps>(
  ({
    fullWidth,
    disabled,
    borderColor,
    paddingVertical,
    paddingHorizontal,
  }) => ({
    paddingVertical: paddingVertical ? paddingVertical : 6,
    paddingHorizontal: paddingHorizontal ? paddingHorizontal : 18,
    borderRadius: 8,
    borderColor: borderColor ? COLORS[borderColor] : COLORS.gray200,
    borderWidth: 1,
    width: fullWidth ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
    flexDirection: "row",
    gap: 12,
  }),
);

const StyledText = styled.Text<ButtonStyledProps>`
  color: ${({ color }) => (color ? COLORS[color] : COLORS.gray200)};
  font-size: ${({ fontSize }) => (fontSize ? fontSize + "px" : "16px")};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "bold")};
  text-align: center;
`;

export default WeakButton;
