import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/colors";
import toRupee from "../js/toRupee";

const PriceDetail = ({ price }) => {
  const discount = 0;
  const delivery = 40;
  const total = price + delivery;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Price Details</Text>
      <View style={styles.row}>
        <Text style={styles.text}>Price</Text>
        <Text style={styles.text}>{toRupee(price)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Discount</Text>
        <Text style={styles.text}>{toRupee(discount)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery Charge</Text>
        <Text style={styles.text}>{toRupee(delivery)}</Text>
      </View>
      <View style={[styles.row, styles.total_row]}>
        <Text style={styles.total}>Total Amount</Text>
        <Text style={styles.total}>{toRupee(total)}</Text>
      </View>
    </View>
  );
};

export default PriceDetail;

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,

    shadowColor: COLORS.gray,
    elevation: 4,
    backgroundColor: "white",
    marginBottom: 5,
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
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray,
    marginBottom: 5,
  },
});
