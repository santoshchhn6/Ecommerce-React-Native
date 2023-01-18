import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/colors";
import Feather from "react-native-vector-icons/Feather";

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.btn, { ...props.style }]}
    >
      <View style={styles.btnWrapper}>
        {props.icon && (
          <Feather
            style={styles.icon}
            name={props.icon}
            size={20}
            color={COLORS.gray}
          />
        )}
        <Text style={[styles.text, { ...props.textStyle }]}>{props.title}</Text>
      </View>
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
    marginHorizontal: 5,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: COLORS.dark,
    elevation: 3,
    backgroundColor: COLORS.white,
  },
  btnWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: COLORS.gray,
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
});
