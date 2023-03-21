import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constant/colors";
import { useForm } from "react-hook-form";
import { getCart, getOrders, getUser, getWishList, logIn } from "../firebase";

import { useState } from "react";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { setCart, setOrders, setUser, setWishList } from "../redux/action";

const Login = ({ route, navigation }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const logInAndFetchUserInfo = async (data) => {
    try {
      setLoading(true);
      const userCredential = await logIn(data);

      const doc = await getUser(userCredential.user.uid);
      let userData = { ...doc.data(), id: doc.id };

      console.log(userData);

      const cartDocs = await getCart(userData.id);
      let cartData = cartDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const wisListDocs = await getWishList(userData.id);
      let wishListData = wisListDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const ordersDocs = await getOrders(userData.id);
      let ordersData = ordersDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log("fetching====================");
      console.log(wishListData.length);
      console.log(ordersData.length);

      dispatch(setUser(userData));
      dispatch(setCart(cartData));
      dispatch(setWishList(wishListData));
      dispatch(setOrders(ordersData));

      setLoading(false);
      reset({});

      navigation.navigate("Root");
    } catch (e) {
      console.log(e);
      setError(true);
      setLoading(false);
    }
  };

  const onSignInPressed = (data) => {
    logInAndFetchUserInfo(data);
  };
  const onDemoPressed = () => {
    navigation.navigate("Root");
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>E</Text>
          <Text style={styles.heading2}>SHOP</Text>
        </View>
        <CustomInput
          name="email"
          control={control}
          placeholder="Email ID"
          rules={{
            required: "Email is Required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
        />

        <CustomInput
          secureTextEntry
          name="password"
          control={control}
          placeholder="Password"
          rules={{
            required: "Password is Required",
            minLength: {
              value: 8,
              message: "Password should be minimum of 8 character long.",
            },
          }}
        />

        {error ? <Text style={styles.error}>Authentication failed</Text> : null}

        <CustomButton
          style={styles.btn}
          textStyle={styles.btn_txt}
          title="Login"
          onPress={handleSubmit(onSignInPressed)}
        />
        <CustomButton
          style={styles.btn}
          textStyle={styles.btn_txt}
          title="Demo Login"
          onPress={onDemoPressed}
        />

        <View style={styles.row}>
          <Text style={styles.text}>Don't have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.text2}>Create new Account.</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? <Loading /> : null}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "95%",
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 34,
    fontWeight: "bold",
    color: COLORS.primaryColor,
  },
  heading2: {
    fontSize: 34,
    fontWeight: "bold",
    color: COLORS.gray,
  },
  btn: {
    marginTop: 10,
    height: 50,
    marginHorizontal: 0,
    backgroundColor: COLORS.primaryColor,
    shadowColor: COLORS.primaryColor,
    borderColor: COLORS.primaryColor,
    borderRadius: 8,
  },
  btn_txt: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: COLORS.gray,
  },
  text2: {
    marginLeft: 5,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  error: {
    color: COLORS.red,
    fontSize: 16,
  },
});
