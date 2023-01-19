import { Image, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";

const SlideCard = (props) => {
  return (
    <View style={[styles.container, { ...props.style }]}>
      <Swiper
        style={styles.wrapper}
        loop={false}
        showsButtons={false}
        dotStyle={{ marginBottom: -20 }}
        activeDotStyle={{ marginBottom: -20 }}
      >
        {props.data.map((image, i) => (
          <Image key={i} style={styles.slide1} source={{ uri: image }} />
        ))}
      </Swiper>
    </View>
  );
};

export default SlideCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1,
    // borderWidth: 1,
    // borderColor: "red",
  },
  wrapper: {
    // width: "100%",
    // aspectRatio: 1,
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
});
