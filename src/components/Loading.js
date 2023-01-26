import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/colors";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../../assets/loading.gif")} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 80,
    height: 80,
  },
});
