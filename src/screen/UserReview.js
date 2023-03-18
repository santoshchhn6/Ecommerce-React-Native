import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../constant/colors";
import Rating from "../components/Rating";
import { getUserReviews } from "../firebase";
import { useSelector } from "react-redux";

const UserReview = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [reviews, setReviews] = useState([]);
  const userId = useSelector((state) => state.userReducer.user.id);
  const products = useSelector((state) => state.productReducer.products);

  const fetchReviews = async () => {
    const response = await getUserReviews(userId);
    let reviewsData = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const productWithReviews = [];
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < reviewsData.length; j++) {
        const { productId, review, rating } = reviewsData[j];
        if (productId === products[i].id) {
          productWithReviews.push({ ...products[i], review, rating });
        }
      }
    }
    setReviews(productWithReviews);
  };

  useEffect(() => {
    if (user) fetchReviews();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.products}>
        {reviews.map((e, i) => {
          const { title, images, defaultImageIndex, rating, review } = e;

          return (
            <View key={i} style={styles.product}>
              <View style={styles.product_info}>
                <View style={styles.img_container}>
                  <Image
                    style={styles.img}
                    source={{ uri: images[defaultImageIndex] }}
                  />
                </View>
                <View style={styles.info}>
                  <Text style={styles.title}>{title}</Text>
                </View>
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
  },

  products: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },

  product: {
    width: "95%",
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    borderColor: COLORS.border,
    borderWidth: 1,

    shadowColor: COLORS.dark,
    elevation: 4,
    backgroundColor: "white",
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
  img_container: {
    width: "30%",
    aspectRatio: 1,
    padding: 10,
  },
  info: {
    width: "70%",
  },
  img: {
    flex: 1,
  },
});
