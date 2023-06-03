import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import useCart from '../../hooks/useCart';

const FoodCard = ({ item }) => {
	const { price, name, recipe, image, _id } = item;
	const [, refetch] = useCart();
	// console.log(refetch);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleAddToCart = (item) => {
		console.log(item);
		if (user && user.email) {
			const cartItem = {
				menuId: _id,
				name,
				price,
				image,
				email: user.email,
			};
			fetch('http://localhost:5000/carts', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(cartItem),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);

					if (data.insertedId) {
						refetch(); // update the data from cart
						Swal.fire({
							position: 'top-end',
							icon: 'success',
							title: 'Food added on cart',
							showConfirmButton: false,
							timer: 1500,
						});
					}
				});
		} else {
			Swal.fire({
				title: 'Please login to order food?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'login now!',
			}).then((result) => {
				if (result.isConfirmed) {
					navigate('/login');
				}
			});
		}
	};
	return (
		<div className="card w-80 bg-base-100 shadow-xl">
			<figure>
				<img src={image} alt="Shoes" />
				<p className="absolute right-3 p-1 px-2 top-3 bg-black text-white">
					${price}
				</p>
			</figure>
			<div className="card-body">
				<h2 className="card-title">{name}</h2>
				<p>{recipe}</p>
				<div className="card-actions justify-center">
					<button
						onClick={() => handleAddToCart(item)}
						className="btn btn-outline border-0 border-b-2 rounded-md border-orange-500 bg-gray-200  text-orange-500 hover:text-orange-500"
					>
						Buy Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default FoodCard;
