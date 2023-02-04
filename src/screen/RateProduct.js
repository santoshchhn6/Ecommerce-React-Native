import {
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
import { addToReviews } from "../redux/action";

const RateProduct = ({ route }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const {
    firstName,
    lastName,
    image: userImg,
  } = useSelector((state) => state.userReducer.user);
  const { image, title, price, productId, userId } = route.params;
  const dispatch = useDispatch();

  const handleRating = (r) => {
    setRating(r);
  };

  const handleSubmit = () => {
    let reviews = {
      userImg,
      productId,
      userId,
      username: firstName + " " + lastName,
      rating,
      review: comment,
    };
    console.log(reviews);
    dispatch(addToReviews(reviews));
    console.log("add to reviews");
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
    // borderWidth: 1,
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
