import { Helmet } from 'react-helmet-async';
import useCart from '../../../hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyCart = () => {
	const [cart, refetch] = useCart();

	const total = cart?.reduce((sum, item) => item.price + sum, 0);

	const handleDelete = (item) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(
					`https://bistro-boss-server-tobibur2021.vercel.app/carts/${item._id}`,
					{
						method: 'DELETE',
					}
				)
					.then((res) => res.json())
					.then((data) => {
						if (data.deletedCount) {
							refetch();
							Swal.fire(
								'Deleted!',
								'Your file has been deleted.',
								'success'
							);
						}
					});
			}
		});
	};

	return (
		<div className="max-h-screen my-10 w-full">
			<Helmet>
				<title>Bistro Boss | My cart</title>
			</Helmet>
			<div className="flex justify-evenly items-center h-[80px] uppercase font-semibold text-2xl">
				<h2>Total Items: {cart.length}</h2>
				<h2>Total Price: ${total}</h2>
				<Link to="/dashboard/reservation">
					<button className="btn btn-warning">Pay</button>
				</Link>
			</div>
			<div className="overflow-x-auto w-full">
				<table className="table w-full">
					{/* head */}
					<thead>
						<tr>
							<th>Index</th>
							<th>Image</th>
							<th>Name</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{cart.map((item, index) => (
							<tr key={item._id}>
								<td>{index + 1}</td>
								<td>
									<div className="avatar">
										<div className="mask mask-squircle w-12 h-12">
											<img
												src={item.image}
												alt="Avatar Tailwind CSS Component"
											/>
										</div>
									</div>
								</td>
								<td>{item.name}</td>
								<td>${item.price}</td>
								<td>
									<button
										onClick={() => handleDelete(item)}
										className="btn bg-red-500 btn-md text-2xl"
									>
										<FaTrashAlt></FaTrashAlt>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyCart;
