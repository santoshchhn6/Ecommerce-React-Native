import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Search from "../components/Search";
import ProductList from "../components/ProductList";
import { popular_product } from "../data/data";
import { useSelector } from "react-redux";

const SearchProduct = ({ route, navigation }) => {
  const products = useSelector((state) => state.reducer.products);
  const [search, setSearch] = useState(null);

  let category = route.params && route.params.category;

  let filterProducts = [];
  if (search) {
    filterProducts = products.filter((p) =>
      p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  } else if (category) {
    filterProducts = products.filter(
      (p) => p.category.toLocaleLowerCase() === category.toLocaleLowerCase()
    );
  } else {
    filterProducts = products;
  }

  const handleProductPress = () => {
    navigation.navigate("ProductDetail");
  };

  const handleSearch = (data) => {
    setSearch(data);
  };
  return (
    <View style={styles.container}>
      <Search enabled onChangeText={handleSearch} />
      <ScrollView style={styles.wrapper}>
        {/* Popular products */}
        <ProductList
          onPress={handleProductPress}
          heading={category}
          products={filterProducts}
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
