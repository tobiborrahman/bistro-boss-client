import { Elements } from '@stripe/react-stripe-js';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import CheckOutForm from './CheckOutForm';
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../../../hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Stripe);

const Payment = () => {
	const [cart] = useCart();
	const total = cart.reduce((sum, item) => sum + item.price, 0);
	const price = Math.round(total.toFixed(2));

	return (
		<div>
			<SectionTitle subHeading="Process" heading="Payment"></SectionTitle>

			<Elements stripe={stripePromise}>
				<CheckOutForm cart={cart} price={price}></CheckOutForm>
			</Elements>
		</div>
	);
};

export default Payment;
