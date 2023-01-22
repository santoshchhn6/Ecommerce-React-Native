import {
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

const Login = ({ navigation }) => {
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
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
  },
  wrapper: {
    width: "95%",
  },
  btn: {
    marginTop: 15,
    height: 50,
    backgroundColor: COLORS.green,
    shadowColor: COLORS.green,
    borderColor: COLORS.green,
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
});
