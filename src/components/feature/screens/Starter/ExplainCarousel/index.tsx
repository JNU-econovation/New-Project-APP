import CarouselView from "@components/common/entities/CarouselView";
import ExplainItems from "@components/feature/process/ElplainItems";

const ExplainCarousel = () => {
  return (
    <CarouselView
      loop={false}
      width={300}
      data={Array(ExplainItems.length)
        .fill(0)
        .map((_, index) => index)}
      renderItem={(item) => ExplainItems[item]()}
    />
  );
};

export default ExplainCarousel;
