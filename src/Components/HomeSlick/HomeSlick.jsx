import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sildeImage1 from './../../assets/images/slider-image-3.jpeg';
import sildeImage2 from './../../assets/images/grocery-banner.png';
import sildeImage3 from './../../assets/images/grocery-banner-2.jpeg';
import sildeImage4 from './../../assets/images/slider-image-2.jpeg';
import sildeImage5 from './../../assets/images/slider-image-1.jpeg';
import sildeImage6 from './../../assets/images/slider-2.jpeg';

import Slider from "react-slick";
export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false ,
    autoplay: true 

  };
  return (
    <Slider {...settings}>
      <div>
        <img src={sildeImage1} className="w-full h-[400px]" alt=""/>
      </div>
      <div>
        <img src={sildeImage2} className="w-full h-[400px]" alt=""/>
      </div>
      <div>
        <img src={sildeImage3} className="w-full h-[400px]" alt=""/>
      </div>
      <div>
        <img src={sildeImage4} className="w-full h-[400px]" alt=""/>
      </div>
      <div>
        <img src={sildeImage5} className="w-full h-[400px]" alt=""/>
      </div>
      <div>
        <img src={sildeImage6} className="w-full h-[400px]" alt=""/>
      </div>
    </Slider>
  );
}