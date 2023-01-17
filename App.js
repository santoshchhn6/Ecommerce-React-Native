import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { COLORS } from "./src/constant/colors";
import Main from "./src/screen/Main";
import SearchProduct from "./src/screen/SearchProduct";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="SearchProduct" component={SearchProduct} />
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
