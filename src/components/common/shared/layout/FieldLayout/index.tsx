import styled from "@emotion/native";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";

interface FieldLayoutProps {
  title: string;
  titleSideComponent?: React.ReactNode;
  content: React.ReactNode;
  contentSideComponent?: React.ReactNode;
}

const FieldLayout = ({
  title,
  titleSideComponent,
  content,
  contentSideComponent,
}: FieldLayoutProps) => {
  return (
    <>
      <HeaderContainer>
        <Text fontWeight="medium" fontSize={20}>
          {title}
        </Text>
        {titleSideComponent && titleSideComponent}
      </HeaderContainer>
      <Spacing size={14} />
      <ContentContainer>
        {content}
        {contentSideComponent && (
          <ContentSideComponentContainer>
            {contentSideComponent}
          </ContentSideComponentContainer>
        )}
      </ContentContainer>
    </>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ContentContainer = styled.View`
  position: relative;
`;

const ContentSideComponentContainer = styled.View`
  position: absolute;
  height: 100%;
  right: 0;
`;

export default FieldLayout;
