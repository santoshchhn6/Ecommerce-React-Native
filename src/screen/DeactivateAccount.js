import { StyleSheet, View } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constant/colors";
import { useForm } from "react-hook-form";

const DeactivateAccount = () => {
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
      <View style={styles.wrapper}>
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
          title="Deactivate Account"
          onPress={handleSubmit(onSignInPressed)}
        />
      </View>
    </View>
  );
};

export default DeactivateAccount;

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
    marginHorizontal: 0,
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
});
