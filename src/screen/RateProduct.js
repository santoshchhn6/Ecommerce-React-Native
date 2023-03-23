import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import toRupee from "../js/toRupee";
import { COLORS } from "../constant/colors";
import Card from "../components/Card";
import InteractiveRating from "../components/InteractiveRating";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { addRating, addReviews, getRating } from "../firebase";
import uuid from "react-native-uuid";
import { add_Rating, add_Review } from "../redux/action";

const RateProduct = ({ route, navigation }) => {
  const [comment, setComment] = useState(null);
  const [rating, setRating] = useState(5);
  const {
    firstName,
    lastName,
    image: userImg,
  } = useSelector((state) => state.userReducer.user);
  const demo = useSelector((state) => state.demoReducer.demo);
  const { image, title, price, productId, userId, productRating } =
    route.params;

  const dispatch = useDispatch();

  const handleRating = (r) => {
    setRating(r);
  };

  const createReviewsAndRating = async () => {
    try {
      const newReviews = {
        userImg: userImg ? userImg : null,
        productId,
        userId,
        username: firstName + " " + lastName,
        rating,
        review: comment,
      };

      comment && (await addReviews(uuid.v4(), newReviews));

      const doc = await getRating(productId);
      const reviewData = { ...doc.data(), id: doc.id };

      const newRating = {
        rating: reviewData.rating
          ? (reviewData.rating * reviewData.count + rating) /
            (reviewData.count + 1)
          : rating,
        count: reviewData.count ? reviewData.count + 1 : 1,
      };

      await addRating(productId, newRating);

      Alert.alert("your reviews submitted!");
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = () => {
    if (!demo) createReviewsAndRating();
    else {
      const newReviews = {
        userImg: userImg ? userImg : null,
        productId,
        userId,
        username: firstName + " " + lastName,
        rating,
        review: comment,
      };
      dispatch(add_Review(newReviews));

      const newRating = {
        productId,
        star: productRating.star
          ? (productRating.star * productRating.count + rating) /
            (productRating.count + 1)
          : rating,
        count: productRating.count ? productRating.count + 1 : 1,
      };
      dispatch(add_Rating(newRating));

      Alert.alert("your reviews submitted!");
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
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
            <InteractiveRating onPress={handleRating} size={35} />
            <TextInput
              multiline
              onChangeText={(value) => setComment(value)}
              style={styles.input}
              placeholder="Comment"
            />
            <CustomButton
              onPress={handleSubmit}
              style={styles.btn}
              textStyle={styles.btn_txt}
              title="Submit"
            />
          </Card>
        </View>
      </ScrollView>
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
  input: {
    width: "95%",
    height: 50,
    color: COLORS.gray,
    padding: 5,
    paddingLeft: 10,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: COLORS.lightBlue,
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
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
  },
  btn: {
    marginVertical: 20,
    backgroundColor: COLORS.primaryColor,
    shadowColor: COLORS.primaryColor,
    borderColor: COLORS.primaryColor,
  },
  btn_txt: {
    color: "white",
    fontSize: 18,
  },
});
