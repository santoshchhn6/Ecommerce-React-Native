import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constant/colors";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { categories } from "../data/data";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/* Search */}
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

        {/* Banner */}
        <View style={styles.banner}>
          <Image
            style={styles.banner_img}
            source={{
              uri: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/3ce709113389695.60269c221352f.jpg",
            }}
          />
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {categories.map((c, i) => {
              let { category, img } = c;
              return (
                <View style={styles.category}>
                  <View style={styles.category_img_container}>
                    <Image
                      style={styles.category_img}
                      key={i}
                      source={{
                        uri: img,
                      }}
                    />
                  </View>
                  <Text style={styles.text}>{category}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
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
  wrapper: {
    marginTop: 40,
    width: "95%",
    alignItems: "center",
    // borderColor: COLORS.secondaryColor,
    // borderWidth: 2,
  },

  search: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.dark,
    borderWidth: 2,
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10,
  },
  input: {
    width: "85%",
    padding: 10,
  },
  icon: {
    marginRight: 5,
  },
  banner: {
    width: "100%",
    aspectRatio: 3 / 2,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  banner_img: {
    flex: 1,
    resizeMode: "contain",
  },
  categories: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    // borderColor: COLORS.dark,
    // borderWidth: 2,
    marginBottom: 10,
  },
  category: {
    // borderColor: COLORS.secondaryColor,
    // borderWidth: 2,
    marginRight: 10,
    alignItems: "center",
    // backgroundColor: COLORS.secondaryColor,

    // shadowColor: "#52006A",
    // elevation: 10,
  },
  category_img_container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: COLORS.border,
    // borderWidth: 1,
    overflow: "hidden",

    shadowColor: COLORS.dark,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: "white",
  },
  category_img: {
    flex: 1,
  },
  text: {
    color: COLORS.lightGray,
  },
});
