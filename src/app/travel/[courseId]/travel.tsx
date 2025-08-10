import TravelMonitorSection from "@screens/travel/TravelMonitorSection";
import TravelWithCourseMapWebview from "@screens/travel/TravelWithCourseMapWebview";
import PositionBottom from "@shared/layout/PositionBottom";
import Spacing from "@shared/layout/Spacing";
import { Suspense } from "react";

const WithoutCourseTravel = () => {
  return (
    <>
      <Spacing size={16} />
      <Suspense>
        <TravelWithCourseMapWebview />
      </Suspense>
      <PositionBottom bottom={24}>
        <TravelMonitorSection />
      </PositionBottom>
    </>
  );
};

export default WithoutCourseTravel;
