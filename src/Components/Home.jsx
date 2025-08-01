import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Itemcart from "./Itemcart";

const Home = () => {
  const navigate = useNavigate();
  const [trendingProducts, setTrendingProducts] = useState([]);
  useEffect(() => {
    fetch("https://swiggy-api-4c740.web.app/swiggy-api.json")
      .then(res => res.json())
      .then(data => setTrendingProducts(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants));

 }, []);

  const heroImages = [
    "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGZvb2R8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZCUyMHBpenphfGVufDB8fDB8fHww",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="flex flex-col gap-10 pb-10">
      <section className="w-full">
        <Slider {...sliderSettings}>
          {heroImages.map((img, idx) => (
            <div key={idx} className="relative h-[400px] sm:h-[500px]">
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Delicious Food Delivered Fast
                </h1>
                <p className="text-lg md:text-xl mb-6">Fresh, Hot & On Time!</p>
                <div className="flex gap-4">
                  <button
                    className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
                    onClick={() => navigate("/menu")}
                  >
                    Explore Menu
                  </button>
                  <button
                    className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
                    onClick={() => navigate("/order")}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      <section className="px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Top Trending Restaurants</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingProducts.map((product) => (
            <Itemcart key={product.id} resto={product}/>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
