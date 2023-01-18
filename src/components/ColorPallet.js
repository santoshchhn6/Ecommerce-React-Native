import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constant/colors";
import Entypo from "react-native-vector-icons/Entypo";

const ColorPallet = ({ colors }) => {
  const [active, setActive] = useState(0);
  return (
    <View style={styles.container}>
      {colors.map((color, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => setActive(i)}
          style={[styles.color, { backgroundColor: color }]}
        >
          {active === i && (
            <Entypo
              style={styles.icon}
              name="check"
              size={20}
              color={COLORS.white}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ColorPallet;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 5,
  },
  color: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    // borderWidth: 1,
    // borderColor: "red",
    borderRadius: 10,
    backgroundColor: COLORS.border,
  },
});
