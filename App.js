import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { COLORS } from "./src/constant/colors";
import Login from "./src/screen/Login";
import Main from "./src/screen/Main";
import OrderSummary from "./src/screen/OrderSummary";
import Payment from "./src/screen/Payment";
import Register from "./src/screen/Register";
import SearchProduct from "./src/screen/SearchProduct";
import * as Application from "expo-application";
import { Provider } from "react-redux";
import { Store } from "./src/redux/store";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function App() {
  console.log("Android Id:" + Application.androidId);
  console.log("Application Id:" + Application.applicationId);
  console.log("Application Name:" + Application.applicationName);
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          // screenOptions={{ header: () => null }}
        >
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchProduct"
            component={SearchProduct}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="OrderSummary" component={OrderSummary} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
