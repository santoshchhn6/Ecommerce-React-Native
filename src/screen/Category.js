import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Search from "../components/Search";
import { COLORS } from "../constant/colors";
import { categories } from "../data/data";

const Category = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Search */}
      <TouchableOpacity onPress={() => navigation.navigate("SearchProduct")}>
        <Search />
      </TouchableOpacity>

      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        <View style={styles.Categories}>
          {categories.map((e, i) => {
            let { category, img } = e;
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SearchProduct", { category })
                }
                key={i}
                style={styles.category}
              >
                <Image style={styles.category_img} source={{ uri: img }} />
                <Text style={styles.category_title}>{category}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  wrapper: {
    width: "95%",
    // borderColor: COLORS.dark,
    // borderWidth: 2,
    overflow: "hidden",
  },
  Categories: {
    marginTop: 10,
    width: "100%",
    // borderColor: COLORS.dark,
    // borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 50,
  },

  category: {
    width: "47%",
    aspectRatio: 1,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
    borderColor: COLORS.border,
    borderWidth: 1,

    shadowColor: COLORS.dark,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: "white",
  },
  category_img: {
    flex: 1,
    borderRadius: 6,
    marginBottom: 5,
    resizeMode: "contain",
  },
  category_title: {
    height: 18,
    color: COLORS.gray,
    // borderColor: COLORS.gray,
    // borderWidth: 1,
  },
});
