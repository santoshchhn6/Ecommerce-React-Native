import { COLORS } from "../constant/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

const InteractiveRating = ({ onPress }) => {
  const stars = ["*", "*", "*", "*", "*"];
  const [rating, setRating] = useState(5);
  const handleOnPress = (i) => {
    setRating(i);
    onPress && onPress(i);
  };
  return (
    <View style={styles.rating}>
      {stars.map((e, i) => (
        <TouchableOpacity key={i} onPress={() => handleOnPress(i + 1)}>
          <AntDesign
            name="star"
            size={45}
            color={i < rating ? COLORS.green : COLORS.lightGray}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default InteractiveRating;

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
