import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constant/colors";
import { useForm } from "react-hook-form";
import {
  addUser,
  addUserImage,
  app,
  createAccount,
  getUser,
  logIn,
} from "../firebase";
import { useState } from "react";
import Loading from "../components/Loading";
import * as ImagePicker from "expo-image-picker";
import Feather from "react-native-vector-icons/Feather";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/action";

const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };
      setImage(source);
    }
  };

  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const PHONE_REGEX = /^\d{10}$/;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const pwd = watch("password");

  const creatAccountAndLogIn = async (data) => {
    setLoading(true);
    let imageUrl = "";
    try {
      const userCredential = await createAccount(data);
      if (image) {
        imageUrl = await addUserImage(image);
      }
      const user = { ...data, uid: userCredential.user.uid, image: imageUrl };
      await addUser(user);
      await logIn(data);

      const userInfo = await getUser(response.user.uid);
      let userData;
      userInfo.forEach((doc) => {
        userData = { ...doc.data(), id: doc.id };
      });
      dispatch(setUser(userData));

      setLoading(false);
      reset({});
      navigation.navigate("Root");
    } catch (err) {
      console.log(err);
      Alert.alert(err.message);
      setLoading(false);
    }
  };

  const onSignInPressed = (data) => {
    creatAccountAndLogIn(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.img_container}>
            <TouchableOpacity onPress={pickImage}>
              <Feather
                style={styles.icon}
                name="edit"
                size={30}
                color={COLORS.white}
              />
              <Image
                style={styles.img}
                source={{
                  uri: image
                    ? image.uri
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                }}
              />
            </TouchableOpacity>
          </View>
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
          <TextInput />
          <CustomButton
            style={styles.btn}
            textStyle={styles.btn_txt}
            title="Create Account"
            onPress={handleSubmit(onSignInPressed)}
          />
        </ScrollView>
      </View>
      {loading && <Loading />}
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
  img_container: {
    alignItems: "center",
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  icon: {
    position: "absolute",
    left: 60,
    bottom: 0,
    zIndex: 2,
    backgroundColor: COLORS.border,
    padding: 3,
    borderRadius: 10,
  },
});
