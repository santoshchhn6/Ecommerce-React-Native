import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/colors";
import toRupee from "../js/toRupee";
import CustomButton from "./CustomButton";

const ProductList = ({ heading, products, onPress, onRemovePress }) => {
  return (
    <View style={styles.container}>
      {heading && <Text style={styles.heading}>{heading}</Text>}
      <View style={styles.products}>
        {products.map((e, i) => {
          const { wishListId, id, title, images, defaultImageIndex, price } = e;

          return (
            <View style={styles.ProductContainer} key={i}>
              <TouchableOpacity
                onPress={() => onPress(id)}
                key={id}
                style={styles.product}
              >
                <Image
                  style={styles.img}
                  source={{
                    uri: defaultImageIndex
                      ? images[defaultImageIndex]
                      : images[0],
                  }}
                />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{toRupee(price)}</Text>
              </TouchableOpacity>
              {onRemovePress && (
                <CustomButton
                  title="Remove"
                  onPress={() => onRemovePress(wishListId)}
                />
              )}
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
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray,
    marginVertical: 5,
    marginLeft: 5,
  },
  products: {
    marginTop: 10,
    width: "100%",

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  ProductContainer: {
    width: "47%",
    flexDirection: "column",
  },
  product: {
    width: "95%",
    aspectRatio: 0.9,
    margin: 10,
    borderRadius: 10,
    // overflow: "hidden",
    padding: 5,
    borderColor: COLORS.border,
    borderWidth: 1,

    shadowColor: COLORS.dark,
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
  },
  text: {
    color: COLORS.lightGray,
  },
});
