import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constant/colors";

const User = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CustomButton style={styles.btn} title="Orders" icon="package" />
        <CustomButton style={styles.btn} title="Wishlist" icon="heart" />
        <CustomButton style={styles.btn} title="My Reviews" icon="edit" />
        <CustomButton
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.btn}
          title="Edit Profile"
          icon="user"
        />
        <CustomButton
          onPress={() => navigation.navigate("SavedAddress")}
          style={styles.btn}
          title="Saved Address"
          icon="map-pin"
        />
        <CustomButton
          style={styles.btn}
          title="Logout"
          icon="arrow-right-circle"
        />
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  wrapper: {
    width: "95%",
    alignItems: "center",
  },
  btn_container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: "50%",
    height: 40,
    marginBottom: 10,
    alignItems: "flex-start",
  },
});
