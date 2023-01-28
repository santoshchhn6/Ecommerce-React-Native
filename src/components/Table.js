import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constant/colors";

const Table = ({ data }) => {
  let toggleColor = true;
  const entries = Object.entries(data);

  return (
    <View>
      <Text style={styles.heading}>Technical Details</Text>
      <View style={styles.table}>
        {entries.map((col, i) => {
          toggleColor = !toggleColor;
          return (
            <View
              key={i}
              style={[
                styles.row,
                { backgroundColor: toggleColor ? COLORS.lightBlue : "white" },
              ]}
            >
              <Text style={styles.text}>{col[0].toUpperCase()}</Text>
              <Text style={styles.text}>{col[1]}</Text>
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
  },
  row: {
    flex: 1,
    flexDirection: "row",
    padding: 8,
  },

  text: {
    flex: 1,
    color: COLORS.gray,
  },
});
