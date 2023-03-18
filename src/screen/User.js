import { StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constant/colors";
import { app, logOut } from "../firebase";
import { useDispatch, useSelector } from "react-redux";

const User = ({ navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    if (user) await logOut();
    dispatch({ type: "USER_LOGOUT" });
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CustomButton
          onPress={() => navigation.navigate("Orders")}
          style={styles.btn}
          title="Orders"
          icon="package"
        />
        <CustomButton
          onPress={() => navigation.navigate("Wishlist")}
          style={styles.btn}
          title="Wishlist"
          icon="heart"
        />
        <CustomButton
          onPress={() => navigation.navigate("My Reviews")}
          style={styles.btn}
          title="My Reviews"
          icon="edit"
        />
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
          onPress={handleLogOut}
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
