import { Helmet } from 'react-helmet-async';
import Cover from '../../../shared/Cover/Cover';
import menuImg from '../../../../assets/menu/banner3.jpg';
import pizzaImg from '../../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../../assets/menu/soup-bg.jpg';
import dessertImg from '../../../../assets/menu/dessert-bg.jpeg';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../../hooks/useMenu';

const Menu = () => {
	const [menu] = useMenu();
	const offered = menu.filter((item) => item.category === 'offered');
	const pizza = menu.filter((item) => item.category === 'pizza');
	const soup = menu.filter((item) => item.category === 'soup');
	const salad = menu.filter((item) => item.category === 'salad');
	const dessert = menu.filter((item) => item.category === 'dessert');
	return (
		<div>
			<Helmet>
				<title>Bistro Boss | Menu</title>
			</Helmet>
			<Cover img={menuImg} title={'our menu'}></Cover>
			<SectionTitle
				subHeading="Don't Miss"
				heading="Today's Offer"
			></SectionTitle>
			<CategoryMenu items={offered}></CategoryMenu>
			<CategoryMenu
				items={dessert}
				img={dessertImg}
				title={'dessert'}
			></CategoryMenu>
			<CategoryMenu
				items={pizza}
				img={pizzaImg}
				title={'pizza'}
			></CategoryMenu>
			<CategoryMenu
				items={salad}
				img={saladImg}
				title={'salad'}
			></CategoryMenu>
			<CategoryMenu
				items={soup}
				img={soupImg}
				title={'soup'}
			></CategoryMenu>
		</div>
	);
};

export default Menu;
