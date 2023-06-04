import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/layout/Main';
import Home from '../pages/Home/Home/Home';
import Menu from '../pages/Home/Menu/Menu/Menu';
import OrderFood from '../pages/OrderFood/OrderFood/OrderFood';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import Secret from '../pages/Secret/Secret';
import PrivateRoute from '../providers/PrivateRoute';
import Dashboard from '../pages/layout/Dashboard';
import MyCart from '../pages/Dashboard/MyCart/MyCart';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import AddItem from '../pages/Dashboard/AddItem/AddItem';
import AdminRoute from './AdminRoute';
import ManageItems from '../pages/Dashboard/ManageItems/ManageItems';
import Payment from '../pages/Dashboard/Payment/Payment';
import UserHome from '../pages/Dashboard/UserHome/UserHome';
import AdminHome from '../pages/Dashboard/AdminHome/AdminHome';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Main></Main>,
		children: [
			{
				path: '/',
				element: <Home></Home>,
			},
			{
				path: '/menu',
				element: <Menu></Menu>,
			},
			{
				path: '/login',
				element: <Login></Login>,
			},
			{
				path: '/signUp',
				element: <SignUp></SignUp>,
			},
			{
				path: 'order/:category',
				element: (
					<PrivateRoute>
						<OrderFood></OrderFood>
					</PrivateRoute>
				),
			},
			{
				path: '/secret',
				element: (
					<PrivateRoute>
						<Secret></Secret>
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: 'dashboard',
		element: (
			<PrivateRoute>
				<Dashboard></Dashboard>
			</PrivateRoute>
		),
		children: [
			{
				path: 'myCart',
				element: <MyCart></MyCart>,
			},
			{
				path: 'userHome',
				element: <UserHome></UserHome>,
			},
			{
				path: 'reservation',
				element: <Payment></Payment>,
			},

			// Admin routes
			{
				path: 'adminHome',
				element: (
					<AdminRoute>
						<AdminHome></AdminHome>
					</AdminRoute>
				),
			},
			{
				path: 'allusers',
				element: (
					<AdminRoute>
						<AllUsers></AllUsers>
					</AdminRoute>
				),
			},
			{
				path: 'addItem',
				element: (
					<AdminRoute>
						<AddItem></AddItem>
					</AdminRoute>
				),
			},
			{
				path: 'manageItems',
				element: <ManageItems></ManageItems>,
			},
		],
	},
]);
