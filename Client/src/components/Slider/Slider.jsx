import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar, A11y } from "swiper/modules";
import { authContext } from "../../context/authContext";
import axios from "axios";
import SliderItem from "../SliderItem/SliderItem";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "./Slider.scss";
import { UPDATE_USERLIST } from "../../context/reducerActions";

const Slider = ({ type, genre, title }) => {
  const [contents, setContents] = useState([]);
  const {userInfo, userList, dispatch } = useContext(authContext);

  useEffect(() => {
    const getList = async () => {
      try {

        let path = "";

        if(title === userInfo.username+"`s List") {
          path="/user/getuserlist";
        }

        else{
          let requestedType = type ? "?type=" + type : "?type=all";
          let requestedGenre = genre ? "&genre=" + genre : "";
          path = "/content/getlist" + requestedType + requestedGenre;
        }

        const response = await axios.get(path, {
          headers: {
            authorization: userInfo.token,
          },
        });
        if (response) {
          if(title === userInfo.username+"`s List"){
            dispatch({type: UPDATE_USERLIST, payload: response.data});
            setContents(userList.contents)
          }else{
            setContents(response.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [type,userList]);

  return (
  <>
    { contents.length > 0  &&
          <div className="slider-container">
          <h1>{title}</h1>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            breakpoints={{
              // when window width is >= 480px
              480: {
                slidesPerView: 1,
              },
              // when window width is >= 768px
              500: {
                spaceBetween: 4,
                slidesPerGroup: 2,
                slidesPerView: 2,
              },
              // when window width is >= 1024px
              1024: {
                spaceBetween: 6,
                slidesPerGroup: 3,
                slidesPerView: 3,
              },
              1280: {
                spaceBetween: 8,
                slidesPerGroup: 4,
                slidesPerView: 4,
              },
              1480: {
                spaceBetween: 10,
                slidesPerGroup: 5,
                slidesPerView: 5,
              },
              // 1880: {
              //   spaceBetween: 12,
              //   slidesPerGroup: 6,
              //   slidesPerView: 6,
              // }
            }}
            navigation={{
              // nextEl: '.swiper-button-next',
              // prevEl: '.swiper-button-prev',
              disabledClass: "disabled_swiper_button",
            }}
            // pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            loop={true}
          >
            {contents.map((content, i) => (
              <SwiperSlide key={i}>
                <SliderItem content={content} />
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
    }
  </>
  );
};

export default Slider;
