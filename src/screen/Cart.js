import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constant/colors";
import Rating from "../components/Rating";
import CustomButton from "../components/CustomButton";
import Counter from "../components/Counter";
import PriceDetail from "../components/PriceDetail";
import toRupee from "../js/toRupee";
import { useSelector } from "react-redux";

const Cart = ({ navigation }) => {
  const products = useSelector((state) => state.productReducer.products);
  const carts = useSelector((state) => state.cartReducer.cart);
  let quantity = 1;

  // const cartProduct = products.filter((product) =>
  //   carts.map((c) => {
  //     if (c.productId === product.id) {
  //       let qty = c.quantity;
  //       return { ...product, qty };
  //     }
  //   })
  // );
  const cartProduct = products.filter((product) =>
    carts.some((c) => c.productId === product.id)
  );

  const cartWithQty = cartProduct.map((product, i) => {
    if (product.id === carts[i].productId) {
      let qty = carts[i].quantity;

      return { ...product, qty };
    }
  });

  const getCounter = (data) => {
    quantity = data;
  };
  let totalPrice = 0;
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/* heading */}
        <Text style={styles.heading}>My Cart</Text>
        <ScrollView>
          <View style={styles.cartItems}>
            {cartWithQty.map((item) => {
              let { id, title, images, price, instock, quantity, rating, qty } =
                item;
              // console.log(qty);
              totalPrice += price * qty;
              return (
                <View key={id} style={styles.cartItem}>
                  <View style={styles.cartItem_info_container}>
                    {/* Image */}
                    <Image
                      style={styles.cartItem_img}
                      source={{ uri: images[0] }}
                    />
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
                    <Counter
                      style={{ width: "40%" }}
                      quantity={qty}
                      getCounter={getCounter}
                    />
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
            onPress={() => navigation.navigate("OrderSummary")}
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

    overflow: "hidden",
    marginBottom: 80,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.gray,
    marginBottom: 10,
  },

  cartItems: {
    width: "100%",
  },
  cartItem: {
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

    marginBottom: 5,
  },
  cartItem_img: {
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

    marginBottom: 5,
  },
  cartItem_quantity: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "center",
  },
  text_container: {
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
    marginBottom: 50,
  },
  btn_txt: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
