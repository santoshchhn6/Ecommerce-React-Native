import { formatCurrency } from "react-native-format-currency";

const toRupee = (amount) => {
  const [valueFormattedWithSymbol] = formatCurrency({
    amount: amount,
    code: "INR",
  });

  return valueFormattedWithSymbol;
};

export default toRupee;
