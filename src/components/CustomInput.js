import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/colors";
import { useForm, Controller } from "react-hook-form";

const CustomInput = (props) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>{props.label}</Text> */}
      <Controller
        rules={props.rules ? props.rules : {}}
        control={props.control}
        name={props.name}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              {...props}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={[
                styles.input,
                { ...props.style },
                { borderColor: error ? COLORS.red : COLORS.border },
              ]}
            />
            {error && (
              <Text style={styles.error}>{error.message || Error}</Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: "red",
    // backgroundColor: COLORS.white,
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    color: COLORS.gray,
    margin: 5,
  },
  input: {
    // backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    // borderRadius: 8,
    padding: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  error: {
    margin: 5,
    color: COLORS.red,
  },
});
