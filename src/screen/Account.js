import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import User from "./User";
import DeactivateAccount from "./DeactivateAccount";
import SavedAddress from "./SavedAddress";
import EditProfile from "./EditProfile";
import Orders from "./Orders";
import Wishlist from "./Wishlist";
import UserReview from "./UserReview";
const Stack = createStackNavigator();
const Account = () => {
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen
        options={{ headerShown: false }}
        name="User"
        component={User}
      />
      <Stack.Screen name="DeactivateAccount" component={DeactivateAccount} />
      <Stack.Screen name="SavedAddress" component={SavedAddress} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="My Reviews" component={UserReview} />
    </Stack.Navigator>
  );
};

export default Account;

const styles = StyleSheet.create({});
