import { Alert, ScrollView, StyleSheet, View } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constant/colors";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { updateUser } from "../firebase";

const SavedAddress = () => {
  const { user } = useSelector((state) => state.userReducer);
  const demo = useSelector((state) => state.demoReducer.demo);
  const [loading, setLoading] = useState(false);
  const PHONE_REGEX = /^\d{10}$/;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("address", user ? user.address : null);
    setValue("phone", user ? user.phone : null);
  }, []);

  const updateAddressAndPhone = async (data) => {
    try {
      setLoading(true);
      const res = await updateUser(user.id, data);
      setLoading(false);
      console.log(res);
      Alert.alert(res);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const onSubmitPressed = (data) => {
    if (!demo) updateAddressAndPhone(data);
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
            onPress={handleSubmit(onSubmitPressed)}
          />
        </ScrollView>
      </View>
      {loading ? <Loading /> : null}
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
