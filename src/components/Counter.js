import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { COLORS } from "../constant/colors";

const Counter = ({ quantity, style, getCounter, onInc, onDec, onPress }) => {
  const [counter, setCounter] = useState(quantity);

  const decrement = () => {
    if (counter > 1) {
      setCounter((c) => c - 1);
      onPress && onPress(counter - 1);
    } else {
      onPress && onPress(counter);
    }
    onDec && onDec();
  };
  const increment = () => {
    if (counter < 5) {
      setCounter((c) => c + 1);
      onPress && onPress(counter + 1);
    } else {
      onPress && onPress(counter);
    }
    onInc && onInc();
  };
  return (
    <View
      style={[styles.container, { ...style }]}
      // counter={getCounter(counter)}
    >
      <CustomButton onPress={decrement} title="-" />
      <View style={styles.text_container}>
        <Text style={styles.text_qty}>{counter}</Text>
      </View>
      <CustomButton onPress={increment} title="+" />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    // width: "40%",
    flexDirection: "row",
    justifyContent: "center",
  },
  text_container: {
    // backgroundColor: COLORS.secondaryColor,
    width: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text_qty: {},
});
