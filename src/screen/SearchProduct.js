import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Search from "../components/Search";
import ProductList from "../components/ProductList";
import { popular_product } from "../data/data";

const SearchProduct = ({ route, navigation }) => {
  const { category } = route.params;
  const products =
    category !== "All"
      ? popular_product.filter(
          (p) => p.category.toLocaleLowerCase() === category.toLocaleLowerCase()
        )
      : popular_product;
  const handleProductPress = () => {
    navigation.navigate("ProductDetail");
  };
  return (
    <View style={styles.container}>
      <Search enabled />
      <ScrollView style={styles.wrapper}>
        {/* Popular products */}
        <ProductList
          onPress={handleProductPress}
          heading={category}
          products={products}
        />
      </ScrollView>
    </View>
  );
};

export default SearchProduct;

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
});
