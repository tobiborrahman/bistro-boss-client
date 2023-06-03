import { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Rating } from '@smastrom/react-rating';
import { FaQuoteLeft } from 'react-icons/fa';
import '@smastrom/react-rating/style.css';

import 'swiper/css';
import 'swiper/css/navigation';

const Testimonials = () => {
	const [reviews, setReviews] = useState([]);
	useEffect(() => {
		fetch('reviews.json')
			.then((res) => res.json())
			.then((data) => {
				setReviews(data);
			});
	}, []);
	return (
		<section>
			<SectionTitle
				subHeading={'What Our Client Say'}
				heading={'testimonials'}
			></SectionTitle>
			<Swiper
				navigation={true}
				modules={[Navigation]}
				className="mySwiper"
			>
				{reviews.map((review) => (
					<SwiperSlide key={review._id}>
						<div className="flex flex-col items-center text-center mx-20 my-8">
							<Rating
								style={{ maxWidth: 180, textAlign: 'center' }}
								value={review.rating}
								readOnly
							/>
							<FaQuoteLeft className="text-6xl mt-6" />
							<p className="mt-6">{review.details}</p>
							<h3 className="text-3xl text-orange-500">
								{review.name}
							</h3>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Testimonials;
