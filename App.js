import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Account from "./src/screen/Account";
import Cart from "./src/screen/Cart";
import Category from "./src/screen/Category";
import Home from "./src/screen/Home";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              return <Ionicons name="home" size={size} color={color} />;
            } else if (route.name === "Category") {
              return <FontAwesome5 name="th-large" size={size} color={color} />;
            } else if (route.name === "Cart") {
              return (
                <FontAwesome5 name="shopping-bag" size={size} color={color} />
              );
            } else if (route.name === "Acount") {
              return <Ionicons name="person-sharp" size={size} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Category" component={Category} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Acount" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
