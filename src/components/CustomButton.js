import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/colors";

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.btn, { ...props.style }]}
    >
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: COLORS.lightGray,

    shadowColor: COLORS.dark,
    elevation: 3,
    backgroundColor: COLORS.white,
  },
});
