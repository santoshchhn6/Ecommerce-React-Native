import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constant/colors";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const Search = (props) => {
  let enable = props.enabled ? true : false;
  return (
    <View style={styles.search}>
      <TextInput
        autoFocus={true}
        editable={enable}
        selectTextOnFocus={enable}
        style={styles.input}
        placeholder="Search"
        onChangeText={props.onChangeText}
      />
      <TouchableOpacity>
        <EvilIcons
          style={styles.icon}
          name="search"
          size={30}
          color={COLORS.dark}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  search: {
    // marginTop: 40,
    width: "95%",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.gray,
    borderWidth: 2,
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10,
  },
  input: {
    width: "85%",
    padding: 8,
  },
  icon: {
    marginRight: 5,
    color: COLORS.gray,
  },
});
