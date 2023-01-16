import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constant/colors";

const Account = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Account</Text>
        <View style={styles.btn_container}>
          <CustomButton style={styles.btn} title="Orders" icon="package" />
          <CustomButton style={styles.btn} title="Wishlist" icon="heart" />
          <CustomButton style={styles.btn} title="My Reviews" icon="edit" />
          <CustomButton style={styles.btn} title="Edit Profile" icon="user" />
          <CustomButton
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
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.gray,
    marginBottom: 10,
  },
  wrapper: {
    width: "95%",
    height: "85%",
    marginTop: 50,
    // borderColor: COLORS.secondaryColor,
    // borderWidth: 1,
    overflow: "hidden",
    // alignItems: "center",
  },
  btn_container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: COLORS.secondaryColor,
    // borderWidth: 1,
  },
  btn: {
    width: "50%",
    height: 40,
    marginBottom: 10,
    alignItems: "flex-start",
  },
});
