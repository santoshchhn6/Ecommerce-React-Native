import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constant/colors";
import { cart, orders } from "../data/data";
import Rating from "../components/Rating";
import CustomButton from "../components/CustomButton";
import Counter from "../components/Counter";
import PriceDetail from "../components/PriceDetail";
import toRupee from "../js/toRupee";
import ColorPallet from "../components/ColorPallet";
import Size from "../components/Size";
import AddressDetail from "../components/AddressDetail";

const OrderSummary = () => {
  let totalPrice = 0;
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ScrollView>
          <AddressDetail />
          <View style={styles.cartItems}>
            {orders.map((item) => {
              let { id, title, img, price, quantity, rating, sizes, colors } =
                item;
              totalPrice += price * quantity;
              return (
                <View key={id} style={styles.cartItem}>
                  <View style={styles.cartItem_info_container}>
                    <Image style={styles.cartItem_img} source={{ uri: img }} />
                    <View style={styles.cartItem_info}>
                      <Text style={styles.cartItem_title}>{title}</Text>
                      {sizes && (
                        <View style={styles.colors}>
                          <Text style={styles.text2}>Size :</Text>
                          <Size sizes={sizes} />
                        </View>
                      )}
                      {colors && (
                        <View style={styles.colors}>
                          <Text style={styles.text2}>Color :</Text>
                          <ColorPallet colors={colors} />
                        </View>
                      )}
                      <Text style={styles.text2}>Quantity: {quantity}</Text>
                      <View>
                        <Rating rate={rating} />
                        <Text style={styles.cartItem_price}>
                          {toRupee(price)}
                        </Text>
                        <TouchableOpacity></TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
          <PriceDetail price={totalPrice} />
          <CustomButton
            // onPress={() => navigation.navigate("OrderSummary")}
            style={styles.btn}
            textStyle={styles.btn_txt}
            title="Continue"
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  wrapper: {
    width: "95%",
    // borderColor: COLORS.dark,
    // borderWidth: 1,
    overflow: "hidden",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.gray,
    marginBottom: 10,
  },

  cartItems: {
    width: "100%",
    // marginBottom: 80,
    // borderColor: COLORS.secondaryColor,
    // borderWidth: 1,
  },
  cartItem: {
    // width: "100%",
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,

    shadowColor: COLORS.dark,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: "white",
  },
  cartItem_info_container: {
    flexDirection: "row",
    // borderColor: COLORS.dark,
    // borderWidth: 1,
    marginBottom: 5,
  },
  cartItem_img: {
    // flex: 1,
    width: "40%",
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 10,
  },
  cartItem_info: {
    width: "60%",
    padding: 10,
    justifyContent: "space-between",
  },
  cartItem_title: {
    fontSize: 15,
    marginBottom: 5,
  },

  cartItem_price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: COLORS.red,
    fontWeight: "bold",
  },
  text2: {
    color: COLORS.gray,
    fontSize: 18,
    marginBottom: 5,
  },
  text3: {
    color: COLORS.gray,
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
  colors: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  btn: {
    marginVertical: 10,
    height: 50,
    backgroundColor: COLORS.secondaryColor,
    borderColor: COLORS.secondaryColor,
    shadowColor: COLORS.secondaryColor,
    marginBottom: 50,
  },
  btn_txt: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
