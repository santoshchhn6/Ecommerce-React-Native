import { COLORS } from "../constant/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import { View, StyleSheet, Text } from "react-native";

const Rating = ({ rate, count, size }) => {
  let total = 5;
  let s = size ? size : 15;
  let r = rate ? rate : 0;
  if (r > 5) r = 5;
  r = Math.floor(r);
  let remaining = total - r;

  return (
    <View style={styles.rating}>
      <Stars n={r} size={s} color={COLORS.green} />
      <Stars n={remaining} size={s} color={COLORS.lightGray} />
      {count ? <Text style={styles.text}>({count})</Text> : null}
    </View>
  );
};

const Stars = ({ n, color, size }) => {
  let stars = [];
  for (let i = 0; i < n; i++) stars.push("*");
  return stars.map((e, i) => (
    <AntDesign key={i} name="star" size={size} color={color} />
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
