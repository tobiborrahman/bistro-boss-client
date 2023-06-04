import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
// import './CheckoutForm.css';

const CheckOutForm = ({ cart, price }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [cardError, setCardError] = useState('');
	const [clientSecret, setSecretClient] = useState('');
	const [processing, setProcessing] = useState(false);
	const [transactionId, setTransactionId] = useState();

	const [axiosSecure] = useAxiosSecure();
	const { user } = useAuth();

	useEffect(() => {
		if (price > 0) {
			axiosSecure
				.post('/create-payment-intent', { price })
				.then((res) => {
					console.log(res.data.clientSecret);
					setSecretClient(res.data.clientSecret);
				});
		}
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);

		if (card === null) {
			return;
		}
		// console.log('card', card);

		const { error } = await stripe.createPaymentMethod({
			type: 'card',
			card,
		});

		if (error) {
			setCardError(error.message);
			console.log('error', error);
		} else {
			setCardError('');
		}

		setProcessing(true);

		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						name: user?.displayName,
						email: user?.email,
					},
				},
			});

		if (confirmError) {
			console.log(confirmError);
		}
		console.log('payment intent', paymentIntent);
		setProcessing(false);

		if (paymentIntent.status === 'succeeded') {
			setTransactionId(paymentIntent.id);
			// TODO: next steps
			const payment = {
				email: user?.email,
				transactionId: paymentIntent.id,
				price,
				date: new Date(),
				menuItems: cart.map((item) => item.menuItemId),
				status: 'service pending',
				quantity: cart.length,
				items: cart.map((item) => item._id),
				itemNames: cart.map((item) => item.name),
			};

			axiosSecure.post('payments', payment).then((res) => {
				console.log(res.data);
				if (res.data.insertedId) {
					// sweet alert
				}
			});
		}
	};

	return (
		<>
			<form className="w-2/3 mx-auto mt-10" onSubmit={handleSubmit}>
				<CardElement
					className="border p-3 rounded"
					options={{
						style: {
							base: {
								fontSize: '16px',
								color: '#424770',
								'::placeholder': {
									color: '#aab7c4',
								},
							},
							invalid: {
								color: '#9e2146',
							},
						},
					}}
				/>
				<button
					className="btn btn-primary mt-4 btn-sm"
					type="submit"
					disabled={!stripe || !clientSecret || processing}
				>
					Pay
				</button>
			</form>
			<div>
				{cardError && <p className="text-red-600">{cardError}</p>}
			</div>
			<div>
				{transactionId && (
					<p className="text-green-500 ml-5">
						Transaction completed with TransactionId:{' '}
						{transactionId}
					</p>
				)}
			</div>
		</>
	);
};

export default CheckOutForm;
