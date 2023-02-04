import { StyleSheet, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/colors";

const Card = (props) => {
  return (
    <View style={[styles.container, { ...props.style }]}>{props.children}</View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: "100%",
    borderColor: COLORS.border,
    borderWidth: 1,
    overflow: "hidden",

    shadowColor: COLORS.lightGray,
    elevation: 8,
    backgroundColor: "white",
  },
});
