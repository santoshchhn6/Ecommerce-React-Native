import { ScrollView, StyleSheet, View } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constant/colors";
import { useForm } from "react-hook-form";
import { app } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Register = () => {
  const auth = getAuth();

  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const PHONE_REGEX = /^\d{10}$/;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const pwd = watch("password");

  const onSignInPressed = (data) => {
    // Register
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ScrollView>
          <CustomInput
            name="firstName"
            control={control}
            placeholder="First Name"
            rules={{
              required: "First Name is Required",
              minLength: {
                value: 3,
                message: "First Name should be minimum 3 character long.",
              },
              maxLength: {
                value: 24,
                message: "First Name should be maximum 24 character long.",
              },
            }}
          />
          <CustomInput
            name="lastName"
            control={control}
            placeholder="Last Name"
            rules={{
              required: "Last Name is Required",
              minLength: {
                value: 3,
                message: "Last Name should be minimum 3 character long.",
              },
              maxLength: {
                value: 24,
                message: "Last Name should be maximum 24 character long.",
              },
            }}
          />
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
            multiline
            name="address"
            control={control}
            placeholder="Address"
            rules={{ required: "Address is Required" }}
          />
          <CustomInput
            keyboardType="phone-pad"
            name="phone"
            control={control}
            placeholder="Phone Number"
            rules={{
              required: "Phone Number is Required",
              pattern: {
                value: PHONE_REGEX,
                message: "Phone Number is invalid",
              },
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
          <CustomInput
            secureTextEntry
            name="confirmPassword"
            control={control}
            placeholder="Confirm Password"
            rules={{
              required: "Confirm Password is Required",
              validate: (value) => value === pwd || "Password do not match.",
            }}
          />
          <CustomButton
            style={styles.btn}
            textStyle={styles.btn_txt}
            title="Create Account"
            onPress={handleSubmit(onSignInPressed)}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;

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
});
