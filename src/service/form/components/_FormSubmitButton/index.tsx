import { useFormContext } from "@service/form/context";
import Button from "@shared/ui/Button";

interface FormSubmitButtonProps extends React.ComponentProps<typeof Button> {
  title: string;
}

const _FormSubmitButton = ({ title, ...props }: FormSubmitButtonProps) => {
  const form = useFormContext();

  return <Button title={title} onPress={form.handleSubmit} {...props} />;
};

export default _FormSubmitButton;
