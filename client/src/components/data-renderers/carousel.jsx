import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, EffectCoverflow, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import Typography from '../general/typography';
import useWindowSize from '../../hooks/useWindowSize';

function Carousel({ slideImages, heading }) {
    const navigate = useNavigate();
    const { width } = useWindowSize()
    return (
        <div className="container">
            {heading ?
                <Typography className="md:text-xl text-lg font-semibold text-[#bfb9b9] -mb-8 mt-4">{heading}</Typography>
                : <></>}
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={width > 767 ? 3 : 1}
                autoplay={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
            >
                {
                    slideImages?.map((slideImage) =>
                        <SwiperSlide key={slideImage?.title}>
                            <img onClick={() => navigate(`/book-details/${slideImage?._id}`)} src={`https://covers.openlibrary.org/b/isbn/${slideImage?.isbn}-L.jpg`} className='!rounded-sm hover:scale-105 transition-all cursor-pointer !object-scale-down md:!min-h-[300px] md:!w-full md:!h-full' alt="slide_image" />
                        </SwiperSlide>
                    )
                }
                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div >
    );
}

export default Carousel;