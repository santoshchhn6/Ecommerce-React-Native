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
import PriceDetail from "../components/PriceDetail";
import toRupee from "../js/toRupee";
import ColorPallet from "../components/ColorPallet";
import Size from "../components/Size";
import AddressDetail from "../components/AddressDetail";
import { useDispatch, useSelector } from "react-redux";
import { addToOrder, addToPayment } from "../redux/action";

const OrderSummary = ({ route, navigation }) => {
  const user = useSelector((state) => state.userReducer.user);
  const address = user ? user.address : "Mumbai";
  const phone = user ? user.phone : "0000000000";
  const products = useSelector((state) => state.productReducer.products);
  const payment = useSelector((state) => state.paymentReducer.payment);
  const dispatch = useDispatch();

  const paymentWithQty = [];
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < payment.length; j++) {
      const { id, productId, quantity, color, size } = payment[j];
      if (productId === products[i].id) {
        paymentWithQty.push({
          ...products[i],
          productId: products[i].id,
          quantity,
          color,
          size,
          paymentId: id,
        });
      }
    }
  }

  const handleProductPress = (id) => {
    const product = products.filter((p) => p.id === id);
    navigation.navigate("ProductDetail", { product });
  };

  const handlePayment = () => {
    dispatch(addToPayment(paymentWithQty));
    navigation.navigate("Payment", { from: route.params.from });
  };
  let totalPrice = 0;
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ScrollView>
          <AddressDetail address={address} phone={phone} />
          <View style={styles.cartItems}>
            {paymentWithQty.map((item, i) => {
              let {
                id,
                title,
                images,
                defaultImageIndex,
                price,
                quantity,
                size,
                color,
              } = item;
              totalPrice += price * quantity;
              return (
                <TouchableOpacity
                  key={i}
                  style={styles.cartItem}
                  onPress={() => handleProductPress(id)}
                >
                  <View style={styles.cartItem_info_container}>
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
                      {size ? (
                        <View style={styles.colors}>
                          <Text style={styles.text2}>Size :</Text>
                          <Size sizes={[size]} />
                        </View>
                      ) : null}
                      {color ? (
                        <View style={styles.colors}>
                          <Text style={styles.text2}>Color :</Text>
                          <ColorPallet colors={[color]} />
                        </View>
                      ) : null}
                      <Text style={styles.text2}>Quantity: {quantity}</Text>
                      <View>
                        <Rating rate={1} count={0} />
                        <Text style={styles.cartItem_price}>
                          {toRupee(price)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <PriceDetail price={totalPrice} />
          <CustomButton
            onPress={handlePayment}
            style={styles.btn}
            textStyle={styles.btn_txt}
            title="Payment"
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
