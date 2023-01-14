import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constant/colors";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput style={styles.input} placeholder="Search" />
        <TouchableOpacity>
          <EvilIcons
            style={styles.icon}
            name="search"
            size={30}
            color={COLORS.dark}
          />
        </TouchableOpacity>
      </View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  input: {
    width: "90%",
    padding: 2,
  },
  search: {
    width: "90%",
    height: 40,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.dark,
    borderWidth: 2,
    borderRadius: 20,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
});
