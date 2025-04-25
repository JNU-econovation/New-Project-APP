import { COLORS } from "@/src/styles/colorPalette";
import ExplainItems from "@components/feature/process/ExplainItems";
import styled from "@emotion/native";

import { useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import LoginButton from "../LoginButton";
import {
  LeftArrowSVG,
  RightArrowSVG,
} from "@components/common/shared/ui/Icons";

const { width, height } = Dimensions.get("window");

const data = Array(ExplainItems.Views.length)
  .fill(0)
  .map((_, index) => index);

const ExplainCarousel = () => {
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [index, setIndex] = useState(0);

  const onPressPagination = (index: number) => {
    carouselRef.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <Container>
      <View>
        {index !== 0 && (
          <View
            style={{
              position: "absolute",
              top: "50%",
              left: 15,
              zIndex: 1,
            }}
          >
            <LeftArrowSVG />
          </View>
        )}
        <Carousel
          ref={carouselRef}
          data={data}
          loop={false}
          width={width}
          height={height - LoginButton.OCCUPY_SPACE}
          onSnapToItem={(i) => i !== index && setIndex(i)}
          onProgressChange={(offsetProgress, absoluteProgress) => {
            if (Math.abs(offsetProgress) < 180) {
              setIndex(0);
            }
            if (Math.abs(offsetProgress) > 180 && index === 0) {
              setIndex(1);
            }
            if (Math.abs(offsetProgress) > 545 && index === 1) {
              setIndex(2);
            }
            if (Math.abs(offsetProgress) < 545 && index === 2) {
              setIndex(1);
            }
            progress.value = absoluteProgress;
          }}
          renderItem={({ index }) => <>{ExplainItems.Views[index]()}</>}
        />
        {index !== data.length - 1 && (
          <View
            style={{
              position: "absolute",
              top: "50%",
              right: 15,
              zIndex: 1,
            }}
          >
            <RightArrowSVG />
          </View>
        )}
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
        }}
      >
        <Pagination.Basic
          progress={progress}
          data={data}
          dotStyle={{
            backgroundColor: COLORS.subGray,
            borderRadius: 10,
            width: 8,
            height: 8,
          }}
          activeDotStyle={{
            backgroundColor: COLORS.mainGreen,
            borderRadius: 10,
          }}
          containerStyle={{
            gap: 5,
          }}
          onPress={onPressPagination}
        />
      </View>
    </Container>
  );
};

const Container = styled.View`
  height: ${height - LoginButton.OCCUPY_SPACE}px;
  justify-content: center;
  align-items: center;
  width: 100%;

  View {
    position: relative;
  }
`;

export default ExplainCarousel;
