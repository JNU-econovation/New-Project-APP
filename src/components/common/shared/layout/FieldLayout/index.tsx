import styled from "@emotion/native";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";

interface FieldLayoutProps {
  title: string;
  titleSideComponent?: React.ReactNode;
  content: React.ReactNode;
}

const FieldLayout = ({
  title,
  titleSideComponent,
  content,
}: FieldLayoutProps) => {
  return (
    <>
      <HeaderContainer>
        <Text fontWeight="bold" fontSize={20}>
          {title}
        </Text>
        {titleSideComponent && titleSideComponent}
      </HeaderContainer>
      <Spacing size={14} />
      {content}
    </>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export default FieldLayout;
