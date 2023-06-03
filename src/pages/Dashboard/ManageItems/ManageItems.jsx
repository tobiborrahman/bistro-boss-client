import { FaTrashAlt } from 'react-icons/fa';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItems = () => {
	const [menu, refetch] = useMenu();
	const [axiosSecure] = useAxiosSecure();

	const handleDelete = (item) => {
		console.log(item);
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
				//
				axiosSecure.delete(`/menu/${item._id}`).then((res) => {
					console.log(res.data);

					if (res.data.deletedCount > 0) {
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
		<div className="w-full">
			<SectionTitle
				subHeading="Hurry Up"
				heading="Manage All items"
			></SectionTitle>

			<div className="overflow-x-auto">
				<table className="table w-full my-10">
					<thead>
						<tr>
							<th>#</th>
							<th>Image</th>
							<th>Name</th>
							<th>Price</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{menu.map((item, index) => (
							<tr key={item._id}>
								<td>{index + 1}</td>
								<td>
									<div className="flex items-center space-x-3">
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<img
													src={item.image}
													alt="Avatar Tailwind CSS Component"
												/>
											</div>
										</div>
									</div>
								</td>
								<td>{item.name}</td>
								<td>{item.price}</td>
								<td>
									<button className="btn btn-ghost btn-xs">
										Update
									</button>
								</td>
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

export default ManageItems;
