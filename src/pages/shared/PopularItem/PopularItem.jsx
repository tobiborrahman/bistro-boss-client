const PopularItem = ({ item }) => {
	const { name, price, image, recipe } = item;
	return (
		<div className="flex">
			<img
				className="w-[100px] bg-gray-300 mr-3"
				style={{ borderRadius: '0px 200px 200px 200px' }}
				src={image}
				alt=""
			/>
			<div>
				<h3 className="text-xl">{name} ------------</h3>
				<p>{recipe}</p>
			</div>
			<p className="text-orange-500">${price}</p>
		</div>
	);
};

export default PopularItem;
