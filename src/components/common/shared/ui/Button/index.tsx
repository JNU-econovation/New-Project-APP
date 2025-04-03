import styled, { css } from "@emotion/native";

interface ButtonStyledProps {
  fullWidth?: boolean;
  disabled?: boolean;
}

interface ButtonProps extends ButtonStyledProps {
  title: string;
  onPress?: () => void;
}

const Button = ({ title, fullWidth, disabled, onPress }: ButtonProps) => {
  return (
    <StyledTouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{ width: fullWidth ? "100%" : undefined }}
    >
      <StyledText>{title}</StyledText>
    </StyledTouchableOpacity>
  );
};

const StyledTouchableOpacity = styled.TouchableOpacity<ButtonStyledProps>(
  ({ fullWidth, disabled }) => ({
    backgroundColor: "#007bff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: fullWidth ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
  }),
);

const StyledText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export default Button;
