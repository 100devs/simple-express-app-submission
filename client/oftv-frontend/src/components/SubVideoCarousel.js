import React from "react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function SubVideoCarousel(props) {
  const [videoInfo, setVideoInfo] = React.useState([]);

  const getVideos = React.useCallback(async () => {
    const res = await fetch("/getVideoInfo");
    const data = await res.json();
    setVideoInfo(data);
  }, []);

  React.useEffect(() => {
    getVideos();
  }, [getVideos, videoInfo]);

  const filteredSlides = videoInfo.filter(video =>
    Object.values(video).includes(props.topic)
  );

  const inputtedSlides = filteredSlides.map(video => {
    return (
      <SwiperSlide>
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <a href={video.link}>
              <img src={video.thumbnail} alt="Video Thumbnail" />
            </a>
            <div className="vid-info">
              <a href={video.link}>
                <h3>{video.title}</h3>
              </a>
              <div className="flex-row space-between">
                <a href={video.channel}>
                  <h4 className="content-creator">{video.creator}</h4>
                </a>
                <h5 className="video-time">Time</h5>
              </div>
            </div>
            <div className="fade-bottom"></div>
          </div>
        </div>
      </SwiperSlide>
    );
  });

  return (
    <section className="swiper-container">
      <h2 className="category">
        <a href="https://of.tv/">{props.topic}</a>
      </h2>
      <div className="swiper mySwiper">
        <div className="fade-left-minor"></div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={6}
          slidesPerView={1}
          slidesPerGroup={1}
          loop={true}
          navigation={{
            nextEl: `.next${props.carouselNumber}`,
            prevEl: `.prev${props.carouselNumber}`,
          }}
          breakpoints={{
            1600: {
              slidesPerView: 5,
            },
            800: {
              slidesPerView: 3,
            },
          }}
        >
          {inputtedSlides}
        </Swiper>
        <div className="fade-right-minor"></div>
      </div>
      <div className={`swiper-button-next next${props.carouselNumber}`}></div>
      <div className={`swiper-button-prev prev${props.carouselNumber}`}></div>
    </section>
  );
}
