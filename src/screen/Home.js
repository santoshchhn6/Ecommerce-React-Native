import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constant/colors";
import { categories } from "../data/data";
import Search from "../components/Search";
import ProductList from "../components/ProductList";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const Home = ({ navigation }) => {
  const { products, loading } = useSelector((state) => state.productReducer);

  const handleProductPress = (id) => {
    const product = products.filter((p) => p.id === id);
    navigation.navigate("Category", {
      screen: "ProductDetail",
      params: { product },
    });
  };
  return (
    <View style={styles.container}>
      {loading && <Loading />}
      {/* Search */}
      <TouchableOpacity onPress={() => navigation.navigate("SearchProduct")}>
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

        {products && (
          <ProductList
            onPress={handleProductPress}
            heading="Popular Products"
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
    marginTop: 40,
    backgroundColor: "white",
    alignItems: "center",
  },
  wrapper: {
    width: "95%",

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
  },
  text: {
    color: COLORS.lightGray,
  },
});
