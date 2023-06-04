import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
	const [axiosSecure] = useAxiosSecure();
	const { data: users = [] } = useQuery(['users'], async () => {
		const res = await axiosSecure.get('/users');
		return res.data;
	});

	const handleMakeAdmin = (user) => {
		fetch(
			`https://bistro-boss-server-tobibur2021.vercel.app/users/admin/${user._id}`,
			{
				method: 'PATCH',
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.modifiedCount) {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: `${user.name} is an Admin Now!`,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
	};

	const handleDelete = (user) => {
		console.log(user);
	};
	return (
		<div>
			<h1 className="text-2xl text-center my-5">
				Total Users: {users.length}
			</h1>
			<div className="overflow-x-auto w-full">
				<table className="table w-full">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<>
								<tr>
									<th>{index + 1}</th>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>
										{user.role === 'admin' ? (
											'admin'
										) : (
											<button
												onClick={() =>
													handleMakeAdmin(user)
												}
												className="btn bg-orange-300 btn-md text-2xl"
											>
												<FaUserShield></FaUserShield>
											</button>
										)}
									</td>
									<td>
										<button
											onClick={() => handleDelete(user)}
											className="btn bg-red-500 btn-md text-2xl"
										>
											<FaTrashAlt></FaTrashAlt>
										</button>
									</td>
								</tr>
							</>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllUsers;
