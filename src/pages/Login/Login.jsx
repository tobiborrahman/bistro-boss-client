import { useContext, useEffect, useRef, useState } from 'react';
import loginImg from '../../assets/others/authentication2.png';
import {
	loadCaptchaEnginge,
	LoadCanvasTemplate,
	validateCaptcha,
} from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
	const { signIn } = useContext(AuthContext);
	const captchaRef = useRef(null);
	const [disabled, setDisabled] = useState(true);

	const location = useLocation();
	const navigate = useNavigate();

	const from = location.state?.from?.pathname || '/';

	useEffect(() => {
		loadCaptchaEnginge(6);
	}, []);

	const handleLogin = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;

		console.log(email, password);

		signIn(email, password)
			.then((result) => {
				console.log(result.user);
				navigate(from, { replace: true });
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Login Successful',
					showConfirmButton: false,
					timer: 1500,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// const handleGoogleLogin = () => {
	// 	googlePopUp()
	// 		.then((result) => {
	// 			console.log(result.user);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	const handleCaptcha = () => {
		const value = captchaRef.current.value;
		console.log(value);
		if (validateCaptcha(value)) {
			setDisabled(false);
		}
	};

	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="flex justify-center items-center">
				<div className="text-center w-1/2 lg:text-left">
					<img src={loginImg} alt="" />
				</div>
				<div className="w-1/2 flex-shrink-0 max-w-sm">
					<form onSubmit={handleLogin} className="card-body">
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
								<span className="label-text text-blue-600">
									<LoadCanvasTemplate />
								</span>
							</label>
							<input
								type="text"
								ref={captchaRef}
								placeholder="type here"
								className="input input-bordered"
							/>
							<button
								onClick={handleCaptcha}
								className="btn btn-outline btn-xs mt-3"
							>
								Validate Captcha
							</button>
						</div>
						{/* TODO: have too activate disabled button */}
						<div className="form-control mt-6">
							<button
								disabled={false}
								className="btn border-0 bg-[#D1A054]"
							>
								Sign In
							</button>
						</div>

						<div className="text-center">
							<p>
								New Here?
								<Link
									className="text-blue-500 ml-2 hover:underline"
									to="/signUp"
								>
									Sign Up
								</Link>
							</p>
						</div>
					</form>
					<div className="text-center">
						<SocialLogin></SocialLogin>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
