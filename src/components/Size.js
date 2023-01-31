import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { COLORS } from "../constant/colors";

const Size = ({ sizes }) => {
  const [active, setActive] = useState(0);
  return (
    <View style={styles.container}>
      {sizes.map((size, i) => (
        <CustomButton
          key={i}
          onPress={() => setActive(i)}
          style={active === i ? styles.active_btn : null}
          textStyle={active === i ? styles.active_txt : null}
          title={size}
        />
      ))}
    </View>
  );
};

export default Size;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  btn: {
    margin: 5,
  },
  active_btn: {
    backgroundColor: COLORS.dark,
  },
  active_txt: {
    color: COLORS.white,
  },
});
