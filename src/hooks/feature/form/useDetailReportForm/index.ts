import { useAppForm } from "@service/form/hooks";
import { formOptions } from "@tanstack/react-form";

export const detailReportForm = formOptions({
  defaultValues: {
    content: "",
    attachments: [],
    address: "",
    reporter: {
      name: "",
      phone: "",
    },
  },
});

const useDetailReportForm = () =>
  useAppForm({
    ...detailReportForm,
    validators: {
      onChange: ({ value }) => {
        console.log("onChange value:", value);
      },
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2));
    },
  });

export default useDetailReportForm;
