import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
	const { googlePopUp } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	const handleGooglePopUp = () => {
		googlePopUp()
			.then((result) => {
				const loggedUser = result.user;
				console.log('loggeduser', loggedUser);
				const user = {
					name: loggedUser.displayName,
					email: loggedUser.email,
				};
				fetch(
					'https://bistro-boss-server-tobibur2021.vercel.app/users',
					{
						method: 'POST',
						headers: {
							'content-type': 'application/json',
						},
						body: JSON.stringify(user),
					}
				)
					.then((res) => res.json())
					.then(() => {
						navigate(from, { replace: true });
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div>
			<div className="divider"></div>
			<div>
				<button
					onClick={handleGooglePopUp}
					className="btn btn-outline btn-circle"
				>
					<FaGoogle></FaGoogle>
				</button>
			</div>
		</div>
	);
};

export default SocialLogin;
