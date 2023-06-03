import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import slide1 from '../../../assets/home/slide1.jpg';
import slide2 from '../../../assets/home/slide2.jpg';
import slide3 from '../../../assets/home/slide3.jpg';
import slide4 from '../../../assets/home/slide4.jpg';
import slide5 from '../../../assets/home/slide5.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const Category = () => {
	return (
		<section>
			<SectionTitle
				subHeading={'from 11am to 10pm'}
				heading={'order online'}
			></SectionTitle>
			<Swiper
				slidesPerView={4}
				spaceBetween={30}
				freeMode={true}
				pagination={{
					clickable: true,
				}}
				modules={[FreeMode, Pagination]}
				className="mySwiper my-20"
			>
				<SwiperSlide>
					<img src={slide1} alt="" />
					<h3 className="text-4xl text-center text-white -mt-20 uppercase">
						salads
					</h3>
				</SwiperSlide>
				<SwiperSlide>
					<img src={slide2} alt="" />
					<h3 className="text-4xl text-white text-center -mt-20 uppercase">
						pizzas
					</h3>
				</SwiperSlide>
				<SwiperSlide>
					<img src={slide3} alt="" />
					<h3 className="text-4xl text-white text-center -mt-20 uppercase">
						soups
					</h3>
				</SwiperSlide>
				<SwiperSlide>
					<img src={slide4} alt="" />
					<h3 className="text-4xl text-white text-center -mt-20 uppercase">
						desserts
					</h3>
				</SwiperSlide>
				<SwiperSlide>
					<img src={slide5} alt="" />
					<h3 className="text-4xl text-white text-center -mt-20 uppercase">
						salads
					</h3>
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default Category;
