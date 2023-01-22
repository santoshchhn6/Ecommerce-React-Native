import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/colors";
import { user_reviews } from "../data/data";
import Rating from "../components/Rating";

const UserReview = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.products}>
        {user_reviews.map((e, i) => {
          const { id, product_title, product_img, rating, review } = e;

          return (
            <View key={id} style={styles.product}>
              <View style={styles.product_info}>
                <Image style={styles.img} source={{ uri: product_img }} />
                <Text style={styles.title}>{product_title}</Text>
              </View>
              <Rating rate={rating} />
              <Text style={styles.text}>{review}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default UserReview;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 50,

    // borderColor: COLORS.secondaryColor,
    // borderWidth: 1,
  },

  products: {
    marginTop: 10,
    width: "100%",
    // borderColor: COLORS.dark,
    // borderWidth: 1,

    alignItems: "center",
  },

  product: {
    width: "95%",
    // aspectRatio: 0.9,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
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
    width: 80,
    height: 80,
    borderRadius: 5,
    resizeMode: "contain",
  },
  title: {
    color: COLORS.gray,
    marginLeft: 10,
    fontSize: 16,
  },
  text: {
    marginTop: 10,
    color: COLORS.lightGray,
  },
  product_info: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
