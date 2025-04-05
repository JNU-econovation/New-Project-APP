import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

interface CarouselViewProps<T> {
  loop?: boolean;
  width: number;
  height?: number;
  snapEnabled?: boolean;
  pagingEnabled?: boolean;
  autoPlayInterval?: number;
  data: T[];
  style?: object;
  onSnapToItem?: (index: number) => void;
  renderItem: (item: T, index: number) => JSX.Element;
}

function CarouselView<T>({
  data,
  renderItem,
  autoPlayInterval,
  height,
  loop,
  onSnapToItem,
  pagingEnabled,
  snapEnabled,
  style,
  width,
}: CarouselViewProps<T>) {
  return (
    <View>
      <Carousel
        loop={loop}
        width={width}
        height={height}
        snapEnabled={snapEnabled}
        pagingEnabled={pagingEnabled}
        autoPlayInterval={autoPlayInterval}
        data={data}
        style={style}
        onSnapToItem={onSnapToItem}
        renderItem={({ item, index }) => renderItem(item, index) as JSX.Element}
      />
    </View>
  );
}

export default CarouselView;
