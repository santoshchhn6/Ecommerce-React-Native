import { COLORS } from "../constant/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import { View, StyleSheet, Text } from "react-native";

const Rating = ({ rate, count }) => {
  let total = 5;
  if (rate > 5) rate = 5;
  rate = Math.floor(rate);
  let remaining = total - rate;

  return (
    <View style={styles.rating}>
      <Stars n={rate} color={COLORS.green} />
      <Stars n={remaining} color={COLORS.lightGray} />
      {count ? <Text style={styles.text}>({count})</Text> : null}
    </View>
  );
};

const Stars = ({ n, color }) => {
  let stars = [];
  for (let i = 0; i < n; i++) stars.push("*");
  return stars.map((e, i) => (
    <AntDesign key={i} name="star" size={15} color={color} />
  ));
};

export default Rating;

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 5,
    color: COLORS.lightGray,
  },
});
