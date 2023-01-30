import { Modal, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constant/colors";

const FeedBack = ({ visible, text }) => {
  return (
    <Modal
      transparent
      visible={visible}
      //   onRequestClose={onRequestClose}
      animationType="fade"
      hardwareAccelerated
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: COLORS.dark,
    elevation: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text: {
    fontSize: 18,
    color: COLORS.gray,
  },
});
