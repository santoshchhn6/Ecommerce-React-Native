import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import User from "./User";
import DeactivateAccount from "./DeactivateAccount";
import SavedAddress from "./SavedAddress";
import EditProfile from "./EditProfile";
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
    </Stack.Navigator>
  );
};

export default Account;

const styles = StyleSheet.create({});
