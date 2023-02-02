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
import PriceDetail from "../components/PriceDetail";
import toRupee from "../js/toRupee";
import ColorPallet from "../components/ColorPallet";
import Size from "../components/Size";
import AddressDetail from "../components/AddressDetail";
import { useSelector } from "react-redux";

const Orders = () => {
  const user = useSelector((state) => state.userReducer.user);
  const orders = useSelector((state) => state.orderReducer.orders);

  const { address, phone } = user;
  let totalPrice = 0;
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {orders.length !== 0 ? (
          <ScrollView>
            <AddressDetail address={address} phone={phone} />
            <View style={styles.cartItems}>
              {orders.map((item) => {
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
                return (
                  <View key={id} style={styles.cartItem}>
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
                          <Rating rate={rating} />
                          <Text style={styles.cartItem_price}>
                            {toRupee(price)}
                          </Text>
                          {/* <TouchableOpacity>
                            <Text style={styles.text}>Cancle Request</Text>
                          </TouchableOpacity> */}
                        </View>
                      </View>
                    </View>
                    <Text style={styles.text3}>
                      Arriving tomarrow at 9:00 AM
                    </Text>
                  </View>
                );
              })}
            </View>
            <PriceDetail price={totalPrice} />
          </ScrollView>
        ) : (
          <Text style={styles.text4}>No items</Text>
        )}
      </View>
    </View>
  );
};

export default Orders;

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
    marginBottom: 50,
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
  text4: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 100,
  },
  colors: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
});
