import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { Box, Text } from "zmp-ui";
import Product from "./Products/Product";
import { useRef, useEffect } from "react";
import { Swiper, Navigation, Pagination } from "swiper";

Swiper.use([Navigation, Pagination]);
const Carousel = () => {
  const swiperElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!swiperElRef.current) return;

    const swiper = new Swiper(swiperElRef.current, {
      slidesPerView: 3,
      navigation: true,
      pagination: true,
      on: {
        progress: (swiper: Swiper, progress: number) => {
          console.log(progress);
        },
        slideChange: () => {
          console.log("slide changed");
        },
      },
    });
    return () => {
      swiper.destroy(true, true);
    };
  }, []);
  const products = useAppSelector((store) => store.products);

  const productList = products.Products.map((productItem) => {
    if (productItem.price < 300000)
      return <Product key={productItem.id} {...productItem}></Product>;
    else return null;
  });
  return (
    <Box px={4}>
      <div className="swiper-container" ref={swiperElRef}>
        <div className="swiper-wrapper">
          <div className="swiper-slide">Slide 1</div>
          <div className="swiper-slide">Slide 2</div>
          <div className="swiper-slide">Slide 3</div>
          ...
        </div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
      {/* <Text bold size="large">
        Sản phẩm bán chạy
      </Text> */}
    </Box>
  );
};

export default Carousel;
