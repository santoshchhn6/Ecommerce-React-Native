import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/colors";
import toRupee from "../js/toRupee";

const PriceDetail = ({ address, phone }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Address Details</Text>
      <View style={{ marginVertical: 5 }}>
        <Text style={styles.text2}>Address</Text>
        <Text style={styles.text}>{address}</Text>
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={styles.text2}>Phone Number</Text>
        <Text style={styles.text}>{phone}</Text>
      </View>
    </View>
  );
};

export default PriceDetail;

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    // alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,

    shadowColor: COLORS.gray,
    elevation: 4,
    backgroundColor: "white",
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.gray,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: COLORS.gray,
    marginBottom: 5,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  total_row: {
    borderTopWidth: 1,
    borderColor: COLORS.border,
    marginTop: 5,
    paddingTop: 5,
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray,
    marginBottom: 5,
  },
});
