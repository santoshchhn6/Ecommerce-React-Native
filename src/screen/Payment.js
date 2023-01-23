import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import {
  CardField,
  StripeProvider,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { STRIPE_PUBLISH_KEY, API_URL } from "@env";
import { useState } from "react";
import { COLORS } from "../constant/colors";

const Payment = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

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
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      // console.log("heelo3");
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
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment Successful", paymentIntent);
          navigation.navigate("Orders");
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with card details
  };
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISH_KEY}>
      <View>
        <TextInput
          style={styles.input}
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

        <Button
          style={styles.cardContainer}
          onPress={handlePayPress}
          title="Pay"
          disabled={loading}
        />
      </View>
    </StripeProvider>
  );
};

export default Payment;

const styles = StyleSheet.create({
  input: {
    margin: 10,
    height: 50,
    backgroundColor: COLORS.white,
    padding: 5,
  },
  card: {
    backgroundColor: COLORS.white,
  },
  cardContainer: {
    height: 50,
    margin: 10,
  },
});
