import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import User from "./src/screen/User";
import Cart from "./src/screen/Cart";
import Category from "./src/screen/Category";
import Home from "./src/screen/Home";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { COLORS } from "./src/constant/colors";
import CustomTabBarButton from "./src/components/CustomTabBarButton";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarActiveTintColor: COLORS.white,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Category") {
              iconName = "grid";
            } else if (route.name === "Cart") {
              iconName = "bag";
            } else if (route.name === "User") {
              iconName = "user";
            }
            return (
              <SimpleLineIcons name={iconName} size={size} color={color} />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Category"
          component={Category}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
      </Tab.Navigator>
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
  tabBar: {
    position: "absolute",
    backgroundColor: COLORS.transparent,
    borderTopWidth: 0,
  },
});
