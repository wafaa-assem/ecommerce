import { FallingLines } from "react-loader-spinner";
import Slider from "react-slick";
import useCategory from "../../CustomHooks/useCategory";

export default function CategoriesSlider() {
  // Slider settings with breakpoints for responsiveness
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Default for larger screens
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, // `lg` screens
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768, // `md` screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 640, // `sm` screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Smaller screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { data, isLoading } = useCategory();

  if (isLoading) {
    return (
      <>
        <FallingLines
          color="green"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </>
    );
  }

  return (
    <>
      <Slider {...settings} className="px-5 my-5">
        {data.data.data.map((category) => (
          <div key={category._id}>
            <img
              src={category.image}
              className="w-full h-40 "
              alt={category.name}
            />
            <h5 className="font-semibold text-center">{category.name}</h5>
          </div>
        ))}
      </Slider>
    </>
  );
}
