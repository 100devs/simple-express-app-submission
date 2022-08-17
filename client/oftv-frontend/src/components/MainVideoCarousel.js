import React from "react";
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/bundle";

export default function MainVideoCarousel(props) {
  const [videoInfo, setVideoInfo] = React.useState([]);

  const getVideos = React.useCallback(async () => {
    const res = await fetch("/getVideoInfo");
    const data = await res.json();
    setVideoInfo(data);
  }, []);

  React.useEffect(() => {
    // Get video info
    getVideos();

    // Autoplay muted video on mouse hover
    document
      .querySelectorAll("iframe")
      .forEach(iframe => iframe.addEventListener("mouseenter", playVideo));

    function playVideo() {
      this.src = this.src.replace("&autoplay=0", "&autoplay=1");
    }

    document
      .querySelectorAll("iframe")
      .forEach(iframe => iframe.addEventListener("mouseleave", stopVideo));

    function stopVideo() {
      this.src = this.src.replace("&autoplay=1", "&autoplay=0");
    }

    // Clean-up
    return () => {
      document
        .querySelectorAll("iframe")
        .forEach(iframe => iframe.removeEventListener("mouseleave", stopVideo));

      document
        .querySelectorAll("iframe")
        .forEach(iframe => iframe.removeEventListener("mouseenter", playVideo));
    };
  }, [getVideos, videoInfo]);

  const slides = videoInfo.map(video => {
    return (
      <SwiperSlide>
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <a href={`${video.link}`}>
              <figure>
                <iframe
                  width="560"
                  height="315"
                  src={`${video.link}?controls=0&autoplay=0&mute=1&enablejsapi=1`.replace(
                    "watch?v=",
                    "embed/"
                  )}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </figure>
            </a>
            <div className="vid-info main">
              <a href={video.channel}>
                <img
                  className="channel-icon"
                  src={video.icon}
                  alt="Channel Icon"
                />
              </a>
              <a href={video.link}>
                <h3>{video.title}</h3>
              </a>
              <a href="$row[channel]">
                <h4>{video.creator}</h4>
              </a>
            </div>
            <div className="fade-bottom-minor"></div>
          </div>
        </div>
      </SwiperSlide>
    );
  });

  return (
    <main className="swiper-container">
      <div className="swiper mySwiper">
        <div className="fade-left"></div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
          effect={"coverflow"}
          spaceBetween={6}
          slidesPerView={1}
          slidesPerGroup={1}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 50,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          breakpoints={{
            800: {
              slidesPerView: 3,
            },
          }}
          navigation={{
            nextEl: `.next0`,
            prevEl: `.prev0`,
          }}
        >
          {slides}
        </Swiper>
        <div className="fade-right"></div>
      </div>
      <div className="swiper-button-next next0"></div>
      <div className="swiper-button-prev prev0"></div>
    </main>
  );
}
