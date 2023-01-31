import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductList from "../components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../redux/action";

const Wishlist = ({ navigation }) => {
  const products = useSelector((state) => state.productReducer.products);
  const wishList = useSelector((state) => state.wishListReducer.wishList);
  const dispatch = useDispatch();
  // console.log(wishList);

  const wishListWithId = [];
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < wishList.length; j++) {
      const { id, productId } = wishList[j];
      if (productId === products[i].id) {
        wishListWithId.push({ ...products[i], wishListId: id });
      }
    }
  }
  const handleProductPress = (id) => {
    const product = products.filter((p) => p.id === id);
    navigation.navigate("Category", {
      screen: "ProductDetail",
      params: { product },
    });
  };

  const onRemovePress = (id) => {
    dispatch(removeFromWishList(id));
  };
  return (
    <View style={styles.container}>
      {wishList.length !== 0 ? (
        <ScrollView style={styles.wrapper}>
          {/* Popular products */}
          <ProductList
            onPress={handleProductPress}
            products={wishListWithId}
            onRemovePress={onRemovePress}
          />
        </ScrollView>
      ) : (
        <Text style={styles.text}>No items</Text>
      )}
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
    overflow: "hidden",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 100,
  },
});
