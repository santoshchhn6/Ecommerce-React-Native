import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/colors";

const ProductList = ({ heading, products }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <View style={styles.products}>
        {products.map((e, i) => {
          let { id, title, img, price } = e;
          return (
            <View key={id} style={styles.product}>
              <Image style={styles.img} source={{ uri: img }} />
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.text}>Rs. {price}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 50,

    // borderColor: COLORS.secondaryColor,
    // borderWidth: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray,
    marginVertical: 5,
  },
  products: {
    marginTop: 10,
    width: "100%",
    // borderColor: COLORS.dark,
    // borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  product: {
    width: "47%",
    aspectRatio: 0.9,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
    borderColor: COLORS.border,
    borderWidth: 1,

    shadowColor: COLORS.dark,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: "white",
  },
  img: {
    flex: 1,
    borderRadius: 5,
    resizeMode: "contain",
  },
  title: {
    height: 18,
    color: COLORS.gray,
    // borderColor: COLORS.gray,
    // borderWidth: 1,
  },
  text: {
    color: COLORS.lightGray,
  },
});
