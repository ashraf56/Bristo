import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import img1 from '../../assets/home/slide1.jpg';
import img2 from '../../assets/home/slide2.jpg';
import img3 from '../../assets/home/slide3.jpg';
import img4 from '../../assets/home/slide4.jpg';
import SETTitle from '../SETTitle';

const Categoryslide = () => {
        return (
                <section>

                        <SETTitle
                                subtitle={"10.00pm"}
                                heading={'Order'}
                        >

                        </SETTitle>

                        <Swiper
                                slidesPerView={3}

                                pagination={{
                                        clickable: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper w-3/4 text-white"
                        >

                                <SwiperSlide>
                                        <img src={img1} />
                                        <p className='uppercase -mt-16 text-center text-4xl'>salad</p>

                                </SwiperSlide>
                                <SwiperSlide>
                                        <img src={img4} />
                                        <p className='uppercase -mt-16 text-center text-4xl'>Cake</p>

                                </SwiperSlide>
                                <SwiperSlide>
                                        <img src={img3} />
                                        <p className='uppercase -mt-16 text-center text-4xl'>cofee</p>

                                </SwiperSlide>
                                <SwiperSlide>
                                        <img src={img2} alt='' />
                                        <h2 className='uppercase -mt-16 text-center text-4xl  '>Pizza</h2>

                                </SwiperSlide>

                        </Swiper>
                </section>
        );
};

export default Categoryslide;