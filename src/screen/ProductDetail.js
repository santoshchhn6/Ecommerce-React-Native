import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { COLORS } from "../constant/colors";
import Rating from "../components/Rating";
import Counter from "../components/Counter";
import CustomButton from "../components/CustomButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import Table from "../components/Table";
import Reviews from "../components/Reviews";
import ColorPallet from "../components/ColorPallet";
import Size from "../components/Size";
import SlideCard from "../components/SlideCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToPayment,
  addToWishList,
  removeFromWishList,
} from "../redux/action";
import FeedBack from "../components/FeedBack";
import uuid from "react-native-uuid";
import toRupee from "../js/toRupee";
import {
  addCart,
  addWishList,
  deleteWishList,
  getRating,
  getReviews,
} from "../firebase";

const ProductDetail = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  const wishList = useSelector((state) => state.wishListReducer.wishList);

  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [visible, setVisible] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(null);
  const [count, setCount] = useState(null);
  const dispatch = useDispatch();

  let { product } = route.params;
  const {
    id,
    title,
    images,
    defaultImageIndex,
    price,
    details,
    instock,
    sizes,
    colors,
  } = product[0];

  let liked =
    wishList.length !== 0 ? wishList.some((w) => w.productId === id) : null;

  const fetchReviews = async () => {
    const response = await getReviews(id);
    let reviewsData = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setReviews(reviewsData);
  };
  const fetchRating = async () => {
    const doc = await getRating(id);
    let ratingData = { ...doc.data(), id: doc.id };
    console.log(ratingData);
    setRating(ratingData.rating);
    setCount(ratingData.count);
  };

  useLayoutEffect(() => {
    setQuantity(1);
  }, [id]);

  useEffect(() => {
    fetchReviews();
    fetchRating();

    setColor(null);
    setSize(null);
  }, [id]);

  const handleCounterPress = (data) => {
    setQuantity(data);
  };

  const getSelectedColor = (c) => {
    setColor(c);
  };

  const getSelectedSize = (s) => {
    setSize(s);
  };

  const showFeedBack = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  const handleLike = (id) => {
    if (!liked) {
      console.log("liked");
      const newWishListId = uuid.v4();
      dispatch(addToWishList({ id: newWishListId, productId: id }));
      if (user)
        addWishList(newWishListId, { productId: id, userId: user.id })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
    } else {
      console.log("unliked");
      const wishListId = wishList.filter((w) => w.productId === id)[0].id;
      console.log(wishListId);
      dispatch(removeFromWishList(wishListId));
      if (user)
        deleteWishList(wishListId)
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
    }
  };

  const handleAddToCart = (id) => {
    const cartId = uuid.v4();
    dispatch(addToCart({ id: cartId, productId: id, quantity, color, size }));
    showFeedBack();
    //firebase
    if (user)
      addCart(cartId, { productId: id, userId: user.id, quantity, color, size })
        .then((res) => console.log(res))
        .catch((e) => console.log(e.message));
  };

  const handleBuyNow = () => {
    const newPaymentId = uuid.v4();
    dispatch(
      addToPayment([{ id: newPaymentId, productId: id, quantity, color, size }])
    );
    navigation.navigate("OrderSummary", { from: "ProductDetail" });
  };

  const handleRateProduct = () => {
    navigation.navigate("RateProduct", {
      image: images[defaultImageIndex],
      title,
      price,
      userId: user.id,
      productId: id,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ alignContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <FeedBack text="Added To Cart" visible={visible} />
        {/* Images */}
        <View style={styles.wrapper}>
          <Panel style={styles.img_container}>
            {images ? <SlideCard data={images} /> : null}
            <TouchableOpacity
              style={styles.wish_icon_container}
              onPress={() => handleLike(id)}
            >
              <AntDesign
                name="heart"
                size={20}
                color={liked ? COLORS.red : COLORS.lightGray}
              />
            </TouchableOpacity>
          </Panel>
          {/* Title */}
          <Panel>
            <Text style={styles.text2}>{title}</Text>
            {/* Color */}
            {colors.length !== 0 ? (
              <View style={styles.colors}>
                <Text style={styles.text2}>Color :</Text>
                <ColorPallet
                  colors={colors}
                  getSelectedColor={getSelectedColor}
                />
              </View>
            ) : null}
            {/* Size */}
            {sizes.length !== 0 ? (
              <View style={styles.colors}>
                <Text style={styles.text2}>Size :</Text>
                <Size sizes={sizes} getSelectedSize={getSelectedSize} />
              </View>
            ) : null}
            {/* Rating */}
            <Rating rate={rating} count={count} />
            {/* Price */}
            <Text style={styles.price}>{toRupee(price)}</Text>
          </Panel>
          <Panel>
            <View style={[styles.row, { marginBottom: 10 }]}>
              {/* Quantity */}
              <Counter quantity={quantity} onPress={handleCounterPress} />
              {/* Stock */}
              {instock ? (
                <Text
                  style={{
                    color: COLORS.green,
                    fontSize: 18,
                  }}
                >
                  InStock
                </Text>
              ) : (
                <Text
                  style={{
                    color: COLORS.red,
                    fontSize: 18,
                  }}
                >
                  OutOfStock
                </Text>
              )}
            </View>
            {/* Add to cart */}
            <View style={styles.row}>
              <CustomButton
                onPress={() => handleAddToCart(id)}
                style={styles.btn}
                title="Add to Cart"
                textStyle={styles.btn_text}
              />
              {/* Buy Now */}
              <CustomButton
                style={styles.btn_buy}
                title="Buy Now"
                textStyle={styles.btn_buy_text}
                onPress={handleBuyNow}
              />
            </View>
          </Panel>

          {/* Details */}

          <Panel style={styles.padding0}>
            <Table data={details} />
          </Panel>

          {/* Reviews */}
          <Panel style={styles.padding0}>
            <Reviews reviews={reviews} onPress={handleRateProduct} />
          </Panel>
        </View>
      </ScrollView>
    </View>
  );
};

const Panel = (props) => (
  <View style={[styles.panel, { ...props.style }]}>{props.children}</View>
);

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  scrollView: {
    marginTop: 30,
    width: "100%",
  },
  wrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },

  colors: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btn: {
    width: "50%",
    height: 50,
    borderRadius: 10,
    marginRight: 5,
  },
  btn_text: {
    color: COLORS.gray,
    fontSize: 18,
    fontWeight: "bold",
  },

  btn_buy: {
    width: "50%",
    height: 50,
    borderRadius: 10,
    marginLeft: 5,
    backgroundColor: COLORS.secondaryColor,
    borderColor: COLORS.secondaryColor,
    shadowColor: COLORS.secondaryColor,
  },
  btn_buy_text: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: COLORS.gray,
    fontSize: 16,
  },
  text2: {
    color: COLORS.gray,
    fontSize: 18,
    marginBottom: 5,
  },
  stock: {
    color: COLORS.green,
    fontSize: 18,
  },
  price: {
    color: COLORS.dark,
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 5,
  },
  panel: {
    width: "100%",
    borderColor: COLORS.border,
    borderWidth: 1,
    overflow: "hidden",
    marginHorizontal: 5,
    marginBottom: 5,
    padding: 5,
    paddingHorizontal: 10,

    shadowColor: COLORS.lightGray,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: "white",
  },
  img_container: {
    width: "100%",
    aspectRatio: 1,
  },
  wish_icon_container: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.dark,
    elevation: 2,

    position: "absolute",
    left: 10,
    bottom: 10,
  },
  img: {
    flex: 1,
    resizeMode: "contain",
  },
  padding0: {
    paddingHorizontal: 0,
  },
});
