import {
	FaBook,
	FaCalendarAlt,
	FaHamburger,
	FaHome,
	FaShoppingBag,
	FaShoppingCart,
	FaUser,
	FaUtensilSpoon,
	FaVoicemail,
	FaWallet,
} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
	const [cart] = useCart();

	// const isAdmin = true;
	const [isAdmin] = useAdmin();
	return (
		<div className="drawer drawer-mobile">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content ">
				<Outlet></Outlet>
				<label
					htmlFor="my-drawer-2"
					className="btn btn-primary drawer-button lg:hidden"
				>
					Open drawer
				</label>
			</div>
			<div className="drawer-side bg-[#D1A054]">
				<label htmlFor="my-drawer-2" className="drawer-overlay"></label>
				<ul className="menu p-4 w-64  text-base-content">
					{isAdmin ? (
						<>
							<li>
								<NavLink to="/dashboard/adminHome">
									<FaHome></FaHome> Admin Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/addItem">
									<FaUtensilSpoon></FaUtensilSpoon> Add an
									Item
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/manageItems">
									<FaWallet></FaWallet> Manage Items
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/history">
									<FaBook></FaBook> Manage Bookings
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/allusers">
									<FaUser></FaUser> All Users
								</NavLink>
							</li>
						</>
					) : (
						<>
							<li>
								<NavLink to="/dashboard/userHome">
									<FaHome></FaHome> Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/reservation">
									<FaCalendarAlt></FaCalendarAlt> Reservation
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/history">
									<FaWallet></FaWallet> Payment History
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/myCart">
									<FaShoppingCart></FaShoppingCart> My cart
									<div className="badge badge-secondary">
										+{cart.length || 0}
									</div>
								</NavLink>
							</li>
						</>
					)}

					<div className="divider"></div>

					<li>
						<NavLink to="/">
							<FaHome></FaHome> Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/menu">
							<FaHamburger></FaHamburger> Menu
						</NavLink>
					</li>
					<li>
						<NavLink to="/order/salad">
							<FaShoppingBag></FaShoppingBag> Shop
						</NavLink>
					</li>
					<li>
						<NavLink to="/contact">
							<FaVoicemail></FaVoicemail> Contact
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Dashboard;
