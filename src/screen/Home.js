import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constant/colors";
import { categories, popular_product } from "../data/data";
import Search from "../components/Search";

const Home = () => {
  return (
    <View style={styles.container}>
      {/* Search */}
      <Search />

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
                <View key={i} style={styles.category}>
                  <View style={styles.category_img_container}>
                    <Image
                      style={styles.category_img}
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

        {/* Popular products */}
        <View style={styles.popular_products_container}>
          <Text style={styles.header_text}>Popular Products</Text>
          <View style={styles.popular_products}>
            {popular_product.map((e, i) => {
              let { id, title, img, price } = e;
              return (
                <View key={id} style={styles.popular_product}>
                  <Image
                    style={styles.popular_product_img}
                    source={{ uri: img }}
                  />
                  <Text style={styles.popular_product_title}>{title}</Text>
                  <Text style={styles.text}>Rs. {price}</Text>
                </View>
              );
            })}
          </View>
        </View>
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
  header_text: {
    color: COLORS.gray,
    fontSize: 18,
  },
  popular_products_container: {
    width: "100%",
    marginBottom: 50,

    // borderColor: COLORS.secondaryColor,
    // borderWidth: 1,
  },
  popular_products: {
    marginTop: 10,
    width: "100%",
    // borderColor: COLORS.dark,
    // borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  popular_product: {
    width: "47%",
    aspectRatio: 0.9,
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
  popular_product_img: {
    flex: 1,
    borderRadius: 5,
    resizeMode: "contain",
  },
  popular_product_title: {
    height: 18,
    color: COLORS.gray,
    // borderColor: COLORS.gray,
    // borderWidth: 1,
  },
});
