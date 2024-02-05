// StripeContainer.js
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51NcpRQSA14Avci2pkJzcIEjqpUqThpuO8O7llMQdHSJnuKlPZNcdKWspj9C8fbLTOnfWT1KlbmgxKOtLrBoemkwV00BwDf3obX',
);

//  const options = {
//    // passing the client secret obtained from the server
//    clientSecret:
//      'sk_test_51NcpRQSA14Avci2p5hBPibegvnJETr3z8qYnkecQSI5dgnRW181RBLkYDF7YlKBAndIIkdIkEEQJz7e98ftX0DDs00935EpCeO',
//  };

const Stripe = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Stripe;
