import Text from "@shared/ui/Text";
import Textarea from "@shared/ui/Textarea";
import Spacing from "@shared/layout/Spacing";

interface TextAreaFieldProps extends React.ComponentProps<typeof Textarea> {
  title: string;
}

const TextAreaField = ({ title, ...props }: TextAreaFieldProps) => {
  return (
    <>
      <Text fontWeight="bold" fontSize={20}>
        {title}
      </Text>
      <Spacing size={14} />
      <Textarea {...props} />
    </>
  );
};

export default TextAreaField;
