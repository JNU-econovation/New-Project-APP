import FieldLayout from "@shared/layout/FieldLayout";
import Spacing from "@shared/layout/Spacing";
import Textarea from "@shared/ui/Textarea";

interface TextAreaFieldProps extends React.ComponentProps<typeof Textarea> {
  title: string;
}

const TextAreaField = ({ title, ...props }: TextAreaFieldProps) => {
  return (
    <FieldLayout
      title={title}
      content={
        <>
          <Spacing size={14} />
          <Textarea {...props} />
        </>
      }
    />
  );
};

export default TextAreaField;
