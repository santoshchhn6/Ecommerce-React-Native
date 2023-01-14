import { StyleSheet, Text, View } from "react-native";

const Account = () => {
  return (
    <View style={styles.container}>
      <Text>User</Text>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
