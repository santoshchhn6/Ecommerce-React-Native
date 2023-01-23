import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { COLORS } from "./src/constant/colors";
import Login from "./src/screen/Login";
import Main from "./src/screen/Main";
import OrderSummary from "./src/screen/OrderSummary";
import Payment from "./src/screen/Payment";
import ProductDetail from "./src/screen/ProductDetail";
import Register from "./src/screen/Register";
import SearchProduct from "./src/screen/SearchProduct";
const Stack = createStackNavigator();

export default function App() {
  return (
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
        <Stack.Screen name="SearchProduct" component={SearchProduct} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="OrderSummary" component={OrderSummary} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
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
