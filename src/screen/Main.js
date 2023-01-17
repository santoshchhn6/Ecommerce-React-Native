import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import User from "./User";
import Cart from "./Cart";
import Category from "./Category";
import Home from "./Home";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { COLORS } from "../constant/colors";
import CustomTabBarButton from "../components/CustomTabBarButton";

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
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
          return <SimpleLineIcons name={iconName} size={size} color={color} />;
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
    elevation: 0,
  },
});
