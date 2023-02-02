import OrderSummary from "./OrderSummary";
import Payment from "./Payment";
import SearchProduct from "./SearchProduct";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./Main";
const Stack = createStackNavigator();

const Root = () => {
  return (
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
        // options={{ headerShown: false }}
      />
      <Stack.Screen name="OrderSummary" component={OrderSummary} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
};

export default Root;
