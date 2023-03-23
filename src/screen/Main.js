import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Cart from "./Cart";
import Category from "./Category";
import Home from "./Home";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { COLORS } from "../constant/colors";
import CustomTabBarButton from "../components/CustomTabBarButton";
import Account from "./Account";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setProductLoading } from "../redux/action";
import { useEffect } from "react";
import { getProduct } from "../firebase";
import { products } from "../data/data";

const Tab = createBottomTabNavigator();

export default function Main() {
  const demo = useSelector((state) => state.demoReducer.demo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!demo) fetchProduct();
    else fakeLoadingProduct();
  }, []);

  //for demoLogin
  const fakeLoadingProduct = () => {
    dispatch(setProductLoading(true));
    setTimeout(() => {
      dispatch(setProduct(products));
      dispatch(setProductLoading(false));
    }, 1000);
  };

  const fetchProduct = () => {
    dispatch(setProductLoading(true));
    getProduct()
      .then((data) => {
        console.log("fetching products completed");
        console.log(data);
        dispatch(setProduct(data));
        dispatch(setProductLoading(false));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
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
          } else if (route.name === "Account") {
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
        name="Account"
        component={Account}
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
