import { useContext } from 'react';
import loginImg from '../../assets/others/authentication2.png';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const SignUp = () => {
	const { createUser, updateUserProfile } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleSignUp = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;
		const photoUrl = form.photoUrl.value;

		console.log(name, email, password, photoUrl);

		createUser(email, password)
			.then((result) => {
				console.log(result.user);
				updateUserProfile(name, photoUrl)
					.then(() => {
						const user = { name: name, email: email };
						console.log(user);
						fetch('http://localhost:5000/users', {
							method: 'POST',
							headers: {
								'content-type': 'application/json',
							},
							body: JSON.stringify(user),
						})
							.then((res) => res.json())
							.then((data) => {
								console.log('update profile', data);
								if (data.insertedId) {
									form.reset();
									console.log('user profile updated');
									Swal.fire({
										position: 'center',
										icon: 'success',
										title: 'User created successfully',
										showConfirmButton: false,
										timer: 1500,
									});
									navigate('/');
								}
							});
					})
					.catch((err) => {
						console.log(err);
					});
				// navigate('/login');
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="flex justify-center items-center">
				<div className="text-center w-1/2 lg:text-left">
					<img src={loginImg} alt="" />
				</div>
				<div className="w-1/2 flex-shrink-0 max-w-sm">
					<form onSubmit={handleSignUp} className="card-body">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Name</span>
							</label>
							<input
								type="name"
								name="name"
								placeholder="Type Here"
								className="input input-bordered"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								name="email"
								placeholder="Type Here"
								className="input input-bordered"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								name="password"
								placeholder="Enter your password"
								className="input input-bordered"
							/>
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-tex">PhotoUrl</span>
							</label>
							<input
								type="text"
								name="photoUrl"
								placeholder="photo url"
								className="input input-bordered"
							/>
						</div>
						<div className="form-control mt-6">
							<button className="btn border-0 bg-[#D1A054]">
								Sign Up
							</button>
						</div>
						<div className="text-center">
							<p>
								Already Have an Accoutn?
								<Link
									className="text-blue-500 ml-2 hover:underline"
									to="/login"
								>
									Sign In
								</Link>
							</p>
						</div>
					</form>
					<SocialLogin></SocialLogin>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
