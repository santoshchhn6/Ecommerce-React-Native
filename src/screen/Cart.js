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
import { cart } from "../data/data";
import Rating from "../components/Rating";
import CustomButton from "../components/CustomButton";
import Counter from "../components/Counter";
import PriceDetail from "../components/PriceDetail";
import toRupee from "../js/toRupee";

const Cart = () => {
  let totalPrice = 0;
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>My Cart</Text>
        <ScrollView>
          <View style={styles.cartItems}>
            {cart.map((item) => {
              let { id, title, img, price, instock, quantity, rating } = item;
              totalPrice += price * quantity;
              return (
                <View key={id} style={styles.cartItem}>
                  <View style={styles.cartItem_info_container}>
                    <Image style={styles.cartItem_img} source={{ uri: img }} />
                    <View style={styles.cartItem_info}>
                      <Text style={styles.cartItem_title}>{title}</Text>
                      <View>
                        <Rating rate={rating} />
                        <Text style={styles.cartItem_price}>
                          {toRupee(price)}
                        </Text>
                        <Text style={styles.cartItem_instock}>
                          instock:{instock}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.cartItem_buy_container}>
                    <Counter style={{ width: "40%" }} quantity={quantity} />
                    <View style={styles.cartItem_btn_container}>
                      <CustomButton title="Remove" />
                      <CustomButton title="Save for later" />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
          <PriceDetail price={totalPrice} />

          <CustomButton
            style={styles.btn}
            textStyle={styles.btn_txt}
            title="Place Order"
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  wrapper: {
    marginTop: 50,
    width: "95%",
    // borderColor: COLORS.dark,
    // borderWidth: 1,
    overflow: "hidden",
    marginBottom: 120,
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
  cartItem_title: {},

  cartItem_price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cartItem_instock: {
    color: COLORS.green,
  },
  cartItem_buy_container: {
    flexDirection: "row",
    // borderColor: COLORS.secondaryColor,
    // borderWidth: 1,
    marginBottom: 5,
  },
  cartItem_quantity: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "center",
  },
  text_container: {
    // backgroundColor: COLORS.secondaryColor,
    width: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text_qtt: {},
  cartItem_btn_container: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btn: {
    marginVertical: 10,
    height: 50,
    backgroundColor: COLORS.secondaryColor,
    borderColor: COLORS.secondaryColor,
    shadowColor: COLORS.secondaryColor,
  },
  btn_txt: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
