import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Rating from "./Rating";
import Card from "./Card";
import { COLORS } from "../constant/colors";
import CustomButton from "./CustomButton";

const Reviews = ({ reviews, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.rows}>
          <Text style={styles.heading}>Reviews</Text>
          <CustomButton
            onPress={onPress}
            style={styles.btn}
            textStyle={styles.btn_txt}
            title="Rate Product"
          />
        </View>
        <View style={styles.reviews_list}>
          {reviews && reviews.length !== 0
            ? reviews.map((item, i) => (
                <Card key={i} style={styles.review}>
                  <View style={styles.user_container}>
                    <Image
                      style={styles.user_img}
                      source={{
                        uri:
                          item.userImg ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
                      }}
                    />
                    <Text style={styles.username}>{item.username}</Text>
                  </View>
                  <Rating rate={item.rating} />
                  <Text style={styles.text}>{item.review}</Text>
                </Card>
              ))
            : null}
        </View>
      </View>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  wrapper: {
    width: "95%",
  },
  rows: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 5,
  },

  heading: {
    fontSize: 18,
    color: COLORS.gray,
    margin: 5,
  },
  reviews: {},
  reviews_list: {
    flex: 1,
    justifyContent: "center",
  },
  review: {
    width: "98%",
    padding: 10,
    marginVertical: 5,
  },
  user_container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  user_img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    marginVertical: 10,
    color: COLORS.gray,
  },
  btn: {
    backgroundColor: COLORS.primaryColor,
    shadowColor: COLORS.primaryColor,
    borderColor: COLORS.primaryColor,
  },
  btn_txt: {
    color: "white",
  },
});
