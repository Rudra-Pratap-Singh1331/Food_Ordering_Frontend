import React from "react";
import { Link } from "react-router-dom";
import icecreamData from "../data/icecream";
import pizzaData from "../data/pizzajson";
import shakesData from "../data/sahkes";

const fallbackImg =
  "https://images.unsplash.com/photo-1585155772603-8d08a48d42c2?auto=format&fit=crop&w=800&q=80"; // Cutlery dummy image

const SectionCard = ({ restro }) => {
  const imageUrl = restro.image || fallbackImg;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <img
        src={imageUrl}
        alt={restro.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          if (e.target.src !== fallbackImg) {
            e.target.src = fallbackImg;
          }
        }}
      />
      <div className="p-4 space-y-1">
        <h3 className="text-xl font-semibold text-gray-800">{restro.name}</h3>
        <p className="text-sm text-gray-500">
          {restro.location || "Unknown Area"}
        </p>
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-green-600 font-medium">
            ⭐ {restro.rating || "N/A"}
          </span>
          <span className="text-gray-600">
            {restro.costForTwo || "Cost not available"}
          </span>
        </div>
        <Link
          to={`/restro/${restro.id}`}
          className="block text-blue-600 hover:underline text-sm mt-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

const Explore = () => {
  const renderSection = (title, data) => (
    <div className="mb-14">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((restro) => (
          <SectionCard key={restro.id} restro={restro} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-20 px-6 sm:px-10 md:px-16 lg:px-24 py-8 bg-gray-50 min-h-screen">
      {renderSection("🍕 Pizza", pizzaData)}
      {renderSection("🍰 Desserts", icecreamData)}
      {renderSection("🥤 Drinks", shakesData)}
    </div>
  );
};

export default Explore;
