import useGetCurrentPosition from "@hooks/feature/useGetCurrentPosition";
import FieldLayout from "@shared/layout/FieldLayout";
import Textarea from "@shared/ui/Textarea";
import WeakButton from "@shared/ui/WeakButton";
import { router } from "expo-router";

interface PositionSelectFieldProps {
  title: string;
  titleSideButtonTitle: string;
}

const PositionSelectField = ({
  title,
  titleSideButtonTitle,
}: PositionSelectFieldProps) => {
  const { location } = useGetCurrentPosition();

  return (
    <FieldLayout
      title={title}
      titleSideComponent={
        <WeakButton
          title={titleSideButtonTitle}
          onPress={() => {
            router.push("/report/checkPosition");
          }}
        />
      }
      content={
        <Textarea
          value={`${JSON.stringify(location)}`}
          editable={false}
          backgroundColor="subGray"
        />
      }
    />
  );
};

export default PositionSelectField;
