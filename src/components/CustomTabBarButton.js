import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constant/colors";
import Svg, { Path } from "react-native-svg";

const CustomTabBarButton = (props) => {
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
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={styles.inactiveBtn}
      >
        {children}
      </TouchableOpacity>
    );
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: "center",
  },
  activeBtn: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: COLORS.primaryColor,
    top: -21,
    justifyContent: "center",
    alignItems: "center",
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
