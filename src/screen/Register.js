import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constant/colors";
import { useForm, Controller } from "react-hook-form";

const Register = () => {
  const [disableBtn, setDisableBtn] = useState(true);
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const pwd = watch("password");

  const onSignInPressed = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
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
          rules={{ required: "Phone Number is Required" }}
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
          // disabled={disableBtn}
          style={disableBtn ? styles.btn_disable : styles.btn}
          textStyle={styles.btn_txt}
          title="Register"
          onPress={handleSubmit(onSignInPressed)}
        />
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.white,
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
  btn_disable: {
    marginTop: 15,
    height: 50,
    backgroundColor: COLORS.gray,
    shadowColor: COLORS.gray,
    borderColor: COLORS.gray,
  },
});
