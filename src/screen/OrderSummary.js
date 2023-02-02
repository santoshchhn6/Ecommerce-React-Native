import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constant/colors";
// import { cart, orders } from "../data/data";
import Rating from "../components/Rating";
import CustomButton from "../components/CustomButton";
import PriceDetail from "../components/PriceDetail";
import toRupee from "../js/toRupee";
import ColorPallet from "../components/ColorPallet";
import Size from "../components/Size";
import AddressDetail from "../components/AddressDetail";
import { useSelector } from "react-redux";

const OrderSummary = ({ navigation }) => {
  const products = useSelector((state) => state.productReducer.products);
  const payment = useSelector((state) => state.paymentReducer.payment);
  const user = useSelector((state) => state.userReducer.user);
  const { address, phone } = user;
  // console.log(payment);

  const handleProductPress = (id) => {
    const product = products.filter((p) => p.id === id);
    navigation.navigate("ProductDetail", { product });
  };
  let totalPrice = 0;
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ScrollView>
          <AddressDetail address={address} phone={phone} />
          <View style={styles.cartItems}>
            {payment.map((item, i) => {
              let {
                id,
                title,
                images,
                defaultImageIndex,
                price,
                quantity,
                rating,
                size,
                color,
              } = item;
              totalPrice += price * quantity;
              // console.log(price);
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
                      {size && (
                        <View style={styles.colors}>
                          <Text style={styles.text2}>Size :</Text>
                          <Size sizes={[size]} />
                        </View>
                      )}
                      {color && (
                        <View style={styles.colors}>
                          <Text style={styles.text2}>Color :</Text>
                          <ColorPallet colors={[color]} />
                        </View>
                      )}
                      <Text style={styles.text2}>Quantity: {quantity}</Text>
                      <View>
                        <Rating rate={1} count={0} />
                        <Text style={styles.cartItem_price}>
                          {toRupee(price)}
                        </Text>
                        {/* <TouchableOpacity></TouchableOpacity> */}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <PriceDetail price={totalPrice} />
          <CustomButton
            onPress={() => navigation.navigate("Payment")}
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
