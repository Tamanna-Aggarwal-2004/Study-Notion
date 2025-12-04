import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper";
import "./styles.css";

import Course_Card from "./Course_Card";

const CourseSlider = ({ Courses }) => {
  const isFewCourses = Courses?.length <= 3; // ✅ check if less than 3

  return (
    <>
      {Courses?.length ? (
        <Swiper
          centeredSlides={!isFewCourses} // ✅ only center when 3 or more
          loop={true} // ✅ disable loop if less than 3
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={
            !isFewCourses
              ? {
                  delay: 2000,
                  disableOnInteraction: false,
                }
              : false
          }
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          breakpoints={{
            320: {
              slidesPerView: 1,
              centeredSlides:true,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1,
              centeredSlides:true,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="max-h-[30rem] mySwiper pb-6"
        >
          {Courses.map((course, i) => (
            <SwiperSlide key={i} className="flex items-start justify-start">
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5 text-center pt-10">
          No Course Found
        </p>
      )}
    </>
  );
};

export default CourseSlider;
