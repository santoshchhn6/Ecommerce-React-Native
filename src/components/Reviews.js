import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { reviews } from "../data/data";
import Rating from "./Rating";
import Card from "./Card";
import { COLORS } from "../constant/colors";

const Reviews = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reviews</Text>
      <FlatList
        style={styles.reviews}
        contentContainerStyle={styles.reviews_list}
        data={reviews}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.review}>
            <View style={styles.user_container}>
              <Image
                style={styles.user_img}
                source={{
                  uri:
                    item.user_img ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
                }}
              />
              <Text style={styles.username}>{item.username}</Text>
            </View>
            <Rating rate={item.rating} />
            <Text style={styles.text}>{item.review}</Text>
          </Card>
        )}
      />
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
    width: "97%",
    padding: 10,
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
});
