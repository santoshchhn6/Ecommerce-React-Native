import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/colors";
import { useForm, Controller } from "react-hook-form";

const CustomInput = (props) => {
  return (
    <View style={styles.container}>
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
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    color: COLORS.gray,
    margin: 5,
  },
  input: {
    borderWidth: 1,
    height: 50,
    borderColor: COLORS.border,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    // margin: 5,
  },
  error: {
    margin: 5,
    color: COLORS.red,
  },
});
