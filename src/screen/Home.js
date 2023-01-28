import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constant/colors";
import { categories, popular_product } from "../data/data";
import Search from "../components/Search";
import ProductList from "../components/ProductList";
import { useSelector } from "react-redux";

const Home = ({ navigation }) => {
  const products = useSelector((state) => state.reducer.products);

  const handleProductPress = () => {
    navigation.navigate("ProductDetail");
  };
  return (
    <View style={styles.container}>
      {/* Search */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SearchProduct", { category: "All" })
        }
      >
        <Search />
      </TouchableOpacity>

      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
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
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SearchProduct", { category })
                  }
                  key={i}
                  style={styles.category}
                >
                  <View style={styles.category_img_container}>
                    <Image
                      style={styles.category_img}
                      source={{
                        uri: img,
                      }}
                    />
                  </View>
                  <Text style={styles.text}>{category}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Popular products */}
        <ProductList
          onPress={handleProductPress}
          heading="Popular Products"
          products={popular_product}
        />
        {products && (
          <ProductList
            onPress={handleProductPress}
            heading="All Products"
            products={products}
          />
        )}
      </ScrollView>
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
    width: "95%",
    // borderColor: COLORS.dark,
    // borderWidth: 2,
    overflow: "hidden",
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

    marginBottom: 10,
  },
  category: {
    marginRight: 10,
    alignItems: "center",
  },
  category_img_container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: COLORS.border,
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
    // resizeMode: "contain",
  },
  text: {
    color: COLORS.lightGray,
  },
});
