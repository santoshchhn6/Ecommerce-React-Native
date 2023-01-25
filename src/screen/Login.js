import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constant/colors";
import { useForm } from "react-hook-form";
import { app } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";

const Login = ({ route, navigation }) => {
  const [error, setError] = useState(false);
  const auth = getAuth();
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSignInPressed = (data) => {
    // console.log(data);

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // console.log(userCredential.user);
        navigation.navigate("Main");
      })
      .catch((error) => {
        console.log(error.message);
        setError(true);
        // Alert("error");
      });
  };

  useEffect(() => {
    route.params && route.params.clearInput && reset({});
  }, [route]);

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

        {error && <Text style={styles.error}>Authentication failed</Text>}

        <CustomButton
          style={styles.btn}
          textStyle={styles.btn_txt}
          title="Login"
          onPress={handleSubmit(onSignInPressed)}
        />

        <View style={styles.row}>
          <Text style={styles.text}>Don't have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.text2}>Create new Account.</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    // alignItems: "center",
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
