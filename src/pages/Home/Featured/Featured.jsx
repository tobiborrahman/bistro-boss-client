import SectionTitle from '../../../components/SectionTitle/SectionTitle';

import img from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
	return (
		<section className="items-center my-20 bg-fixed featured w-full h-[700px]">
			<div className="content pt-16">
				<div className="text-white">
					<SectionTitle
						subHeading="Check it Out"
						heading="featured item"
					></SectionTitle>
				</div>
				<div>
					<div className="flex justify-center items-center  text-white mt-8">
						<img
							className="w-[400px] h-[250px] mr-10"
							src={img}
							alt=""
						/>
						<div>
							<h4>
								March 20, 2023 <br />
								WHERE CAN I GET SOME?
							</h4>
							<p className="text-sm leading-2 my-1">
								Lorem ipsum dolor sit amet consectetur
								adipisicing <br />
								elit. Blanditiis beatae optio culpa doloribus{' '}
								<br />
								perferendis doloremque eligendi. Ipsa laborum{' '}
								<br />
								dolorem quae saepe. Totam, in. Delectus, hic.
							</p>
							<button className="border-b-2 rounded-lg px-4 py-2">
								Read More
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Featured;
