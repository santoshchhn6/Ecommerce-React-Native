import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constant/colors";
import Svg, { Path } from "react-native-svg";
import Badge from "./Badge";
import { useSelector } from "react-redux";

const CustomTabBarButton = (props) => {
  const carts = useSelector((state) => state.cartReducer.cart);
  const { children, accessibilityState, onPress } = props;

  if (accessibilityState.selected)
    return (
      <View style={styles.btnWrapper}>
        <View style={styles.svgContainer}>
          <View style={styles.svgGapFiller} />
          <Svg width={71} height={58} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.dark}
            />
          </Svg>
          <View style={styles.svgGapFiller} />
        </View>
        {props.to === "/Main/Cart" && carts.length !== 0 && (
          <Badge style={styles.badge} text={carts.length} />
        )}
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={styles.activeBtn}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  else
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={styles.inactiveBtn}
        >
          {props.to === "/Main/Cart" && carts.length !== 0 && (
            <Text style={styles.badge2}>{carts.length}</Text>
          )}
          {children}
        </TouchableOpacity>
      </>
    );
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    zIndex: 10,
    top: -32,
    right: 20,
  },
  badge2: {
    position: "absolute",
    zIndex: 10,
    top: 16,
    right: 57,
    fontSize: 12,
    color: COLORS.white,
  },
  activeBtn: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: COLORS.primaryColor,
    top: -22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primaryColor,
    elevation: 10,
    backgroundColor: COLORS.primaryColor,
  },

  inactiveBtn: {
    flex: 1,
    backgroundColor: COLORS.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  svgContainer: {
    flexDirection: "row",
  },
  svgGapFiller: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
});
