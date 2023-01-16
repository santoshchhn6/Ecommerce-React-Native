import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constant/colors";
import { cart } from "../data/data";
import AntDesign from "react-native-vector-icons/AntDesign";

const Cart = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.cartHeader}>My Cart</Text>
        <FlatList
          style={styles.cartItems}
          contentContainerStyle={styles.flatList}
          data={cart}
          renderItem={({ item }) => {
            let { id, title, img, price, instock, quantity, rating } = item;
            return (
              <View key={id} style={styles.cartItem}>
                <View style={styles.cartItem_info_container}>
                  <Image style={styles.cartItem_img} source={{ uri: img }} />
                  <View style={styles.cartItem_info}>
                    <Text style={styles.cartItem_title}>{title}</Text>
                    <View>
                      <View style={styles.rating}>
                        <AntDesign name="star" size={20} color={COLORS.green} />
                      </View>
                      <Text style={styles.cartItem_price}>₹{price}</Text>
                      <Text style={styles.cartItem_instock}>
                        instock:{instock}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cartItem_buy_container}>
                  <View style={styles.cartItem_quantity}>
                    <TouchableOpacity style={[styles.btn, styles.btn_qtt]}>
                      <Text>-</Text>
                    </TouchableOpacity>
                    <View style={styles.text_container}>
                      <Text style={styles.text_qtt}>{quantity}</Text>
                    </View>
                    <TouchableOpacity style={[styles.btn, styles.btn_qtt]}>
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cartItem_btn_container}>
                    <TouchableOpacity style={[styles.btn, styles.btn_buy]}>
                      <Text>Remove</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.btn_buy]}>
                      <Text>Save for later</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
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
  },
  cartHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.gray,
    marginBottom: 10,
  },
  flatList: {
    // alignItems: "center",
  },
  cartItems: {
    width: "100%",
    marginBottom: 50,
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
  rating: {
    flexDirection: "row",
  },
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
  btn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: COLORS.lightGray,

    shadowColor: COLORS.dark,
    elevation: 3,
    backgroundColor: COLORS.white,
  },
  btn_qtt: {
    // backgroundColor: COLORS.primaryColor,
    // width: 20,
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
  btn_buy: {
    // width: "100%",
    // color: COLORS.dark,
  },
});
