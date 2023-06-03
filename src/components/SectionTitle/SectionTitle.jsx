const SectionTitle = ({ heading, subHeading }) => {
	return (
		<div className="md:w-3/12 mx-auto text-center mt-20">
			<p className="text-orange-500  mb-2 ">---{subHeading}---</p>
			<h3 className="border-y-4 text-3xl py-3 uppercase">{heading}</h3>
		</div>
	);
};

export default SectionTitle;
