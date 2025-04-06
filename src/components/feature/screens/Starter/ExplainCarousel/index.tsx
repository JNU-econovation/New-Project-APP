// import CarouselView from "@components/common/entities/CarouselView";
import ExplainItems from "@components/feature/process/ExplainItems";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");
// const usableHeight = height - 100;

const data = Array(ExplainItems.length)
  .fill(0)
  .map((_, index) => index);

const ExplainCarousel = () => {
  // const carouselRef = useRef<ICarouselInstance>(null);
  // const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Carousel
      loop={false}
      width={width}
      height={height}
      data={data}
      renderItem={({ item }) => <>{ExplainItems[item]()}</>}
    />

    // <View
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: usableHeight,
    //   }}
    // >
    //   <View
    //     style={{
    //       display: "flex",
    //       gap: 40,
    //       alignItems: "center",
    //       marginBottom: 20,
    //     }}
    //   >
    //     <Text fontSize={30} fontWeight="bold" color="mainGreen">
    //       안전을 위한 스마트 가이드
    //     </Text>
    //     <Carousel
    //       // ref={carouselRef}
    //       loop={false}
    //       width={width}
    //       height={width * 0.7}
    //       data={data}
    //       pagingEnabled={true}
    //       onSnapToItem={(index) => {
    //         setCurrentIndex(index);
    //         carouselRef.current?.scrollTo({ index });
    //       }}
    //       onConfigurePanGesture={(p) => {
    //         p.onChange((e) => {
    //           console.log(e);
    //           e.changeX;
    //         });
    //       }}
    //       onScrollStart={() => {
    //         carouselRef.current?.scrollTo({
    //           index:
    //             currentIndex === ExplainDetails.length - 1
    //               ? currentIndex
    //               : currentIndex + 1,
    //           animated: true,
    //         });
    //       }}
    //       renderItem={({ item }) => <>{ExplainItems[item]()}</>}
    //     />
    //     <Carousel
    //       ref={carouselRef}
    //       loop={false}
    //       width={width}
    //       height={width * 0.7}
    //       data={data}
    //       pagingEnabled={true}
    //       enabled={false}
    //       renderItem={({ item }) => <>{ExplainDetails[item]()}</>}
    //     />
    //   </View>
    // </View>
  );
};

export default ExplainCarousel;
