import { Link } from 'react-router-dom';
import Cover from '../../../shared/Cover/Cover';
import PopularItem from '../../../shared/PopularItem/PopularItem';

const CategoryMenu = ({ items, title, img }) => {
	return (
		<>
			{title && <Cover img={img} title={title}></Cover>}
			<div className="grid md:grid-cols-2 gap-4 my-10">
				{items.map((item) => (
					<PopularItem key={item._id} item={item}></PopularItem>
				))}
			</div>
			<Link to={`/order/${title}`}>
				<button className="btn btn-outline border-0 border-b-4 rounded-md">
					Order Your Favorite food
				</button>
			</Link>
		</>
	);
};

export default CategoryMenu;
