import { ScrollView, StyleSheet, View } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constant/colors";
import { useForm } from "react-hook-form";

const SavedAddress = () => {
  const PHONE_REGEX = /^\d{10}$/;

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
        <ScrollView>
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

          <CustomButton
            style={styles.btn}
            textStyle={styles.btn_txt}
            title="Update Address"
            onPress={handleSubmit(onSignInPressed)}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default SavedAddress;

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
});
