import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../constant/colors";
import Rating from "../components/Rating";
import { getUserReviews } from "../firebase";
import { useSelector } from "react-redux";

const UserReview = () => {
  const { user } = useSelector((state) => state.userReducer);
  const demo = useSelector((state) => state.demoReducer.demo);
  const productReviews = useSelector((state) => state.reviewReducer.reviews);

  const [reviews, setReviews] = useState([]);
  const products = useSelector((state) => state.productReducer.products);

  const fetchReviews = async () => {
    const response = await getUserReviews(user.id);
    let reviewsData = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setProductWithReviews(reviewsData);
  };

  useEffect(() => {
    if (!demo) fetchReviews();
    else
      setProductWithReviews(productReviews.filter((p) => p.userId === user.id));
  }, []);

  const setProductWithReviews = (reviews) => {
    const productWithReviews = [];
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < reviews.length; j++) {
        const { productId, review, rating } = reviews[j];
        if (productId === products[i].id) {
          productWithReviews.push({ ...products[i], review, rating });
        }
      }
    }
    setReviews(productWithReviews);
  };
  return (
    <ScrollView style={styles.container}>
      {reviews.length !== 0 ? (
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
      ) : (
        <Text style={styles.text4}>No Reviews</Text>
      )}
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
  text4: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 100,
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
