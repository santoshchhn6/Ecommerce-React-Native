import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/colors";

const Badge = (props) => {
  return (
    <View style={[styles.badge, { ...props.style }]}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: COLORS.red,
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    // padding: 2,
    // paddingHorizontal: 8,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 13,
  },
});
