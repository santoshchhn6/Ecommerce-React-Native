import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constant/colors";
import Rating from "../components/Rating";
import CustomButton from "../components/CustomButton";
import Counter from "../components/Counter";
import PriceDetail from "../components/PriceDetail";
import toRupee from "../js/toRupee";
import { useDispatch, useSelector } from "react-redux";
import {
  addToPayment,
  addToWishList,
  decQty,
  incQty,
  removeFromCart,
} from "../redux/action";
import ColorPallet from "../components/ColorPallet";
import uuid from "react-native-uuid";
import Size from "../components/Size";

const Cart = ({ navigation }) => {
  const products = useSelector((state) => state.productReducer.products);
  const carts = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();
  let cartQty = 1;
  let totalPrice = 0;

  const cartWithQty = [];
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < carts.length; j++) {
      const { id, productId, quantity, color, size } = carts[j];
      if (productId === products[i].id) {
        cartWithQty.push({ ...products[i], quantity, color, size, cartId: id });
      }
    }
  }

  const getCounter = (data) => {
    cartQty = data;
  };

  const handleProductPress = (id) => {
    const product = products.filter((p) => p.id === id);
    navigation.navigate("ProductDetail", { product });
  };

  const handleSaveForLater = (id, cartId) => {
    const wishListId = uuid.v4();
    // console.log(wishListId);
    dispatch(addToWishList({ id: wishListId, productId: id }));
    dispatch(removeFromCart(cartId));
  };

  const handlePlaceOrder = () => {
    dispatch(addToPayment(cartWithQty));
    navigation.navigate("OrderSummary");
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/* heading */}
        <Text style={styles.heading}>My Cart</Text>

        {carts.length !== 0 ? (
          <ScrollView>
            <View style={styles.cartItems}>
              {cartWithQty.map((item, i) => {
                let {
                  id,
                  cartId,
                  title,
                  images,
                  defaultImageIndex,
                  price,
                  instock,
                  rating,
                  quantity,
                  color,
                  size,
                } = item;
                console.log(size);
                totalPrice += price * quantity;
                return (
                  <TouchableOpacity
                    key={i}
                    style={styles.cartItem}
                    onPress={() => handleProductPress(id)}
                  >
                    <View style={styles.cartItem_info_container}>
                      {/* Image */}
                      <Image
                        style={styles.cartItem_img}
                        source={{
                          uri: defaultImageIndex
                            ? images[defaultImageIndex]
                            : images[0],
                        }}
                      />
                      <View style={styles.cartItem_info}>
                        <Text style={styles.cartItem_title}>{title}</Text>
                        <View>
                          {/* SelectedSize */}
                          {size && (
                            <View style={styles.rows}>
                              <Text style={styles.text2}>Size :</Text>
                              <Size sizes={[size]} />
                            </View>
                          )}
                          {/* SelectedColor */}
                          {color && (
                            <View style={styles.rows}>
                              <Text style={styles.text2}>Color :</Text>
                              <ColorPallet colors={[color]} />
                            </View>
                          )}
                          <Rating rate={1} count={0} />
                          <Text style={styles.cartItem_price}>
                            {toRupee(price)}
                          </Text>
                          {instock ? (
                            <Text style={styles.instock}>instock</Text>
                          ) : (
                            <Text style={styles.outofstock}>OutOfStock</Text>
                          )}
                        </View>
                      </View>
                    </View>
                    <View style={styles.cartItem_buy_container}>
                      {/* Quantity */}
                      <Counter
                        style={{ width: "40%" }}
                        quantity={quantity}
                        getCounter={getCounter}
                        onInc={() => dispatch(incQty(id))}
                        onDec={() => dispatch(decQty(id))}
                      />
                      <View style={styles.cartItem_btn_container}>
                        <CustomButton
                          onPress={() => dispatch(removeFromCart(cartId))}
                          title="Remove"
                        />
                        <CustomButton
                          title="Save for later"
                          onPress={() => handleSaveForLater(id, cartId)}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <PriceDetail price={totalPrice} />

            <CustomButton
              onPress={handlePlaceOrder}
              style={styles.btn}
              textStyle={styles.btn_txt}
              title="Place Order"
            />
          </ScrollView>
        ) : (
          <Text style={styles.text}>No items</Text>
        )}
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
  instock: {
    color: COLORS.green,
  },
  outofstock: {
    color: COLORS.red,
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
  rows: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 100,
  },
  text2: {
    fontSize: 18,
  },
});
