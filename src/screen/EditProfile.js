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

const EditProfile = ({ navigation }) => {
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

          <CustomButton
            style={styles.btn}
            textStyle={styles.btn_txt}
            title="Submit"
            onPress={handleSubmit(onSignInPressed)}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("DeactivateAccount")}
            style={styles.text_container}
          >
            <Text style={styles.text}>Deactivate Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  wrapper: {
    width: "95%",
    // alignItems: "center",
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
  text_container: {
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontWeight: "bold",
    color: COLORS.dark,
  },
});
