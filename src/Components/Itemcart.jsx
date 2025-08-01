import React from "react";
import { useNavigate } from "react-router-dom";

const ItemCart = ({ resto }) => {
  const navigate = useNavigate();
  const { name, cloudinaryImageId, id } = resto.info;

  return (
    <div className="relative group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
      <div className="relative">
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${cloudinaryImageId}`}
          alt={name}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300 overflow-hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-100 transition duration-300"></div>
        <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold z-10">{name}</h3>
      </div>
      <div className="p-4 flex justify-between items-center gap-[30px]">
        <button
          onClick={() => navigate(`/restro/${id}`)}
         className="flex-1 text-sm font-semibold px-2 py-2 bg-white text-red-600 border border-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ItemCart;
