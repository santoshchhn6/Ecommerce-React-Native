import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductList from "../components/ProductList";
import { wishlist } from "../data/data";

const Wishlist = ({ navigation }) => {
  const handleProductPress = () => {
    navigation.navigate("ProductDetail");
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.wrapper}>
        {/* Popular products */}
        <ProductList onPress={handleProductPress} products={wishlist} />
      </ScrollView>
    </View>
  );
};

export default Wishlist;

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
