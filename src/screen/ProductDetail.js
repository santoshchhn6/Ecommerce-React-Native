import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/action";

const ProductDetail = ({ route, navigation }) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  let quantity = 1;

  let { product } = route.params;
  const { id, title, images, price, details, instock, sizes, colors } =
    product[0];

  const handleAddToCart = (id) => {
    dispatch(addToCart({ id, quantity }));
  };

  const getCounter = (data) => {
    quantity = data;
  };
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ alignContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Images */}
        <View style={styles.wrapper}>
          <Panel style={styles.img_container}>
            {images && <SlideCard data={images} />}
            <TouchableOpacity
              style={styles.wish_icon_container}
              onPress={() => setLiked(!liked)}
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
            {colors.length !== 0 && (
              <View style={styles.colors}>
                <Text style={styles.text2}>Color :</Text>
                <ColorPallet colors={colors} />
              </View>
            )}
            {/* Size */}
            {sizes.length !== 0 && (
              <View style={styles.colors}>
                <Text style={styles.text2}>Size :</Text>
                <Size sizes={sizes} />
              </View>
            )}
            {/* Rating */}
            {/* <Rating rate={rating} /> */}
            {/* Price */}
            <Text style={styles.price}>Rs.{price}</Text>
          </Panel>
          <Panel>
            <View style={[styles.row, { marginBottom: 10 }]}>
              {/* Quantity */}
              <Counter quantity={1} getCounter={getCounter} />
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
              />
            </View>
          </Panel>

          {/* Details */}

          <Panel style={styles.padding0}>
            <Table data={details} />
          </Panel>

          {/* Reviews */}
          <Panel style={styles.padding0}>
            <Reviews />
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
    // borderColor: COLORS.secondaryColor,
    // borderWidth: 1,
  },
  wrapper: {
    width: "100%",
    // borderColor: COLORS.primaryColor,
    // borderWidth: 1,
    alignItems: "center",

    // overflow: "hidden",
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
    // backgroundColor: COLORS.secondaryColor,
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
    // borderRadius: 10,
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
