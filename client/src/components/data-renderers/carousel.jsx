import ReactCardCarousel from 'react-card-carousel';
import ImageWrapper from './image-wrapper';
import images from '../../assets/images';

const HeroCarousel = ({ slideImages }) => {
    return (
        <div className="!max-w-6xl max-h-screen flex">
            <ReactCardCarousel disable_fade_in ={true} disable_box_shadow={true} spread={'narrow'} autoplay={true} autoplay_speed={4000}>
                {
                    slideImages?.map((image, index) => (
                        <div key={index} className='xl:w-[800px] xl:h-[500px] lg:h-[400px] lg:w-[600px] sm:h-[300px] sm:w-[500px] h-[200px] w-[200px] shadow-none mx-4 cursor-pointer hover:scale-105 transition-all'>
                            <ImageWrapper src={image} />
                        </div>
                    ))
                }
            </ReactCardCarousel>
        </div>
    );
};

export default HeroCarousel;
