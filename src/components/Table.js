import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constant/colors";

const Table = ({ data }) => {
  let toggleColor = true;
  return (
    <View>
      <Text style={styles.heading}>Specs</Text>
      <View style={styles.table}>
        {data.map((row, i) => {
          toggleColor = !toggleColor;
          return (
            <View
              key={i}
              style={[
                styles.row,
                { backgroundColor: toggleColor ? COLORS.lightBlue : "white" },
              ]}
            >
              {row.map((col, j) => {
                return (
                  <View key={j} style={styles.col}>
                    <Text style={styles.text}>
                      {j === 0 ? col.toUpperCase() : col}
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    color: COLORS.gray,
    marginLeft: 5,
  },
  table: {
    marginTop: 5,
    // borderWidth: 1,
    // borderColor: "red",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    padding: 8,

    // borderWidth: 1,
    // borderColor: "green",
  },
  col: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "blue",
  },
  text: {
    color: COLORS.gray,
  },
});
