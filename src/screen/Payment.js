import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CardField,
  StripeProvider,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { STRIPE_PUBLISH_KEY, API_URL } from "@env";
import { useEffect, useState } from "react";
import { COLORS } from "../constant/colors";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { addToOrder, resetCart, resetPayment } from "../redux/action";

const Payment = ({ navigation }) => {
  const user = useSelector((state) => state.userReducer.user);
  const payment = useSelector((state) => state.paymentReducer.payment);

  const [ploading, setPLoading] = useState(false);
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(user.email);
  }, []);

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1. Gather the customer billing info (e.g. email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter the complete card details and Email");
      return;
    }

    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from backened
    setPLoading(true);
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //confirm payment
      if (error) {
        console.log("unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
          setPLoading(false);
        } else if (paymentIntent) {
          setPLoading(false);
          alert("Payment Successful");
          console.log("Payment Successful", paymentIntent);
          dispatch(addToOrder(payment));
          dispatch(resetCart());
          dispatch(resetPayment());
          navigation.navigate("Orders");
        }
      }
    } catch (e) {
      setPLoading(false);
      console.log(e.message);
    }
    //3.Confirm the payment with card details
  };
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISH_KEY}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <TextInput
            style={styles.input}
            defaultValue={email}
            placeholder="Email"
            autoCapitalize={false}
            keyboardType="email-address"
            onChangeText={(value) => setEmail(value)}
          />
          <CardField
            placeholders={{ number: "4242 4242 4242 4242" }}
            postalCodeEnabled={true}
            style={styles.cardContainer}
            cardStyle={styles.card}
            onCardChange={(cardDetails) => setCardDetails(cardDetails)}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={handlePayPress}
            title="Pay"
            disabled={loading}
          >
            <Text style={styles.text}>PAY</Text>
          </TouchableOpacity>
        </View>
        {ploading && <Loading />}
      </View>
    </StripeProvider>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "95%",
  },
  input: {
    margin: 10,
    height: 50,
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 8,
    paddingLeft: 10,
  },
  card: {
    backgroundColor: COLORS.white,
  },
  cardContainer: {
    height: 50,
    margin: 10,
    borderRadius: 8,
  },
  btn: {
    width: "95%",
    height: 50,
    backgroundColor: COLORS.green,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
