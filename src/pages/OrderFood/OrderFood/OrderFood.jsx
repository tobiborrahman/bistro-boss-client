import Cover from '../../shared/Cover/Cover';
import orderFoodImg from '../../../assets/shop/banner2.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import useMenu from '../../../hooks/useMenu';
import { Helmet } from 'react-helmet-async';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';

const OrderFood = () => {
	const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];

	const { category } = useParams();
	const initialIndex = categories.indexOf(category);
	const [tabIndex, setTabIndex] = useState(initialIndex);
	const [menu] = useMenu();

	const drinks = menu.filter((item) => item.category === 'drinks');
	const pizza = menu.filter((item) => item.category === 'pizza');
	const soup = menu.filter((item) => item.category === 'soup');
	const salad = menu.filter((item) => item.category === 'salad');
	const dessert = menu.filter((item) => item.category === 'dessert');

	return (
		<div>
			<Helmet>
				<title>Bistro Boss | Order Food</title>
			</Helmet>
			<Cover img={orderFoodImg} title="Order food"></Cover>
			<div>
				<Tabs
					selectedIndex={tabIndex}
					onSelect={(index) => setTabIndex(index)}
				>
					<TabList>
						<Tab>SALAD</Tab>
						<Tab>PIZZA</Tab>
						<Tab>SOUPS</Tab>
						<Tab>DESSERTS</Tab>
						<Tab>DRINKS</Tab>
					</TabList>
					<TabPanel>
						<OrderTab items={salad}></OrderTab>
					</TabPanel>
					<TabPanel>
						<OrderTab items={pizza}></OrderTab>
					</TabPanel>
					<TabPanel>
						<OrderTab items={soup}></OrderTab>
					</TabPanel>
					<TabPanel>
						<OrderTab items={dessert}></OrderTab>
					</TabPanel>
					<TabPanel>
						<OrderTab items={drinks}></OrderTab>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
};

export default OrderFood;
