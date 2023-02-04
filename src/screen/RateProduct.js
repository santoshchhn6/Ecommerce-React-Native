import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import toRupee from "../js/toRupee";
import { COLORS } from "../constant/colors";
import Card from "../components/Card";
import InteractiveRating from "../components/InteractiveRating";
import AntDesign from "react-native-vector-icons/AntDesign";

const RateProduct = ({ route }) => {
  const { image, title, price } = route.params;
  const handleRating = (rating) => {
    console.log(rating);
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Card style={styles.product}>
          <View style={styles.img_container}>
            <Image style={styles.img} source={{ uri: image }} />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{toRupee(price)}</Text>
          </View>
        </Card>
        <Card style={styles.review_container}>
          <InteractiveRating onPress={handleRating} rate={4} size={35} />
        </Card>
      </View>
    </View>
  );
};

export default RateProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    margin: 10,
    flex: 1,
  },
  product: {
    flexDirection: "row",
  },
  productInfo: {
    width: "50%",
    padding: 8,
    justifyContent: "space-between",
  },
  img_container: {
    width: "50%",
    aspectRatio: 1,
    resizeMode: "contain",
    padding: 10,
  },
  img: {
    flex: 1,
  },
  title: {
    color: COLORS.gray,
    fontSize: 15,
  },
  price: {
    color: COLORS.dark,
    fontWeight: "bold",
    fontSize: 20,
  },
  review_container: {
    marginTop: 10,
    width: "100%",
    minHeight: 250,
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
  },
});
