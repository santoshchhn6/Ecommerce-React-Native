import {
  Image,
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
import Feather from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateUser } from "../firebase";

const EditProfile = ({ navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  const { id, firstName, lastName } = user;
  const userImageUrl = user.image;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("firstName", firstName);
    setValue("lastName", lastName);
    if (userImageUrl) setImgUri(userImageUrl);
  }, []);

  const [image, setImage] = useState(null);
  const [imgUri, setImgUri] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };
      setImage(source);
      setImgUri(source.uri);
    }
  };

  const onSubmitPressed = (data) => {
    console.log(data);
    updateUser(id, data)
      .then((res) => console.log(res))
      .catch((e) => console.log(e.message));
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
                  uri: imgUri,
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

          <CustomButton
            style={styles.btn}
            textStyle={styles.btn_txt}
            title="Submit"
            onPress={handleSubmit(onSubmitPressed)}
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
