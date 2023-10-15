// import './styles.css';
import '../../assets/css/carousel.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ImageWrapper from './image-wrapper';

export default function Caraousel({slideImages}) {
    const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
    const items = ['🍔', '🍕', '🌭', '🍗'];

    // we want the scope to be always to be in the scope of the array so that the carousel is endless
    const indexInArrayScope =
        ((activeIndex % items.length) + items.length) % items.length;

    // so that the carousel is endless, we need to repeat the items twice
    // then, we slice the the array so that we only have 3 items visible at the same time
    const visibleItems = [...items, ...items].slice(
        indexInArrayScope,
        indexInArrayScope + 3
    );
    const handleClick = newDirection => {
        setActiveIndex(prevIndex => [prevIndex[0] + newDirection, newDirection]);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            handleClick(1);
        }, 3000);
        return () => clearInterval(interval);
    })
    return (
        <div className="main-wrapper">
            <div className="wrapper">
                <AnimatePresence mode="popLayout" initial={false}>
                    {visibleItems.map((item,index) => {
                        return (
                            <motion.div
                                className="card hover:scale-105"
                                key={item}
                                layout
                                custom={{
                                    direction,
                                    position: () => {
                                        if (item === visibleItems[0]) {
                                            return 'left';
                                        } else if (item === visibleItems[1]) {
                                            return 'center';
                                        } else {
                                            return 'right';
                                        }
                                    },
                                }}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 1 }}
                            >
                                <ImageWrapper src={slideImages[index]}/>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}

const variants = {
    enter: ({ direction }) => {
        return { scale: 0.2, x: direction < 1 ? 50 : -50, opacity: 0 };
    },
    center: ({ position }) => {
        return {
            scale: position() === 'center' ? 1 : 0.7,
            x: 0,
            zIndex: zIndex[position()],
            opacity: 1,
        };
    },
    exit: ({ direction }) => {
        return { scale: 0.2, x: direction < 1 ? -50 : 50, opacity: 0 };
    },
};

const zIndex = {
    left: 1,
    center: 2,
    right: 1,
};
