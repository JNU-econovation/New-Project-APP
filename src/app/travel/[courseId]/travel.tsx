import TravelMapWebview from "@screens/travel/TravelMapWebview";
import TravelMonitorSection from "@screens/travel/TravelMonitorSection";
import PositionBottom from "@shared/layout/PositionBottom";
import Spacing from "@shared/layout/Spacing";
import { Suspense } from "react";

const WithoutCourseTravel = () => {
  return (
    <>
      <Spacing size={16} />
      <Suspense>
        <TravelMapWebview />
      </Suspense>
      <PositionBottom bottom={24}>
        <TravelMonitorSection />
      </PositionBottom>
    </>
  );
};

export default WithoutCourseTravel;
