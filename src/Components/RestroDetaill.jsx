import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../uceCart'; // ✅ Do not change file name

const RestroDetail = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  const [restro, setRestro] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchRestroData = async () => {
      try {
        const response = await fetch(
          `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=25.4342209&lng=81.7965583&restaurantId=${id}&submitAction=ENTER`
        );
        const data = await response.json();

        setRestro(data?.data?.cards[2]?.card?.card?.info);

        const menuCards =
          data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

        const items = menuCards
          .flatMap((card) => card?.card?.card?.itemCards || [])
          .filter(Boolean); // remove undefined/null

        setMenu(items);
      } catch (error) {
        console.error('Failed to fetch restaurant data:', error);
      }
    };

    fetchRestroData();
  }, [id]);

  const handleAddToCart = (itemInfo) => {
    const price = itemInfo.price || itemInfo.defaultPrice || 0;
    addToCart({
      id: itemInfo.id,
      name: itemInfo.name,
      price: Math.floor(price / 100), // ₹ amount
      quantity: 1,
      image: itemInfo.imageId
        ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_64,h_64,c_fill/${itemInfo.imageId}`
        : 'https://via.placeholder.com/64',
    });
  };

  if (!restro) {
    return <div className="text-center py-20 text-lg">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 px-4 md:px-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
      >
        ← Back to Home
      </button>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">{restro.name}</h1>
        <p className="text-gray-600 text-lg">
          {restro.locality || 'Popular Restaurant'}
        </p>
      </div>

      <div className="max-w-5xl mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">Menu</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menu.map((product) => {
            const info = product?.card?.info;
            if (!info) return null;

            const price = info.price || info.defaultPrice || 0;

            return (
              <div
                key={info.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                {info.imageId ? (
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${info.imageId}`}
                    alt={info.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg mb-3 text-sm">
                    No Image Available
                  </div>
                )}

                <h3 className="text-lg font-bold mb-1">{info.name}</h3>
                <p className="text-gray-500 text-sm mb-2">
                  {info.description || 'No description available.'}
                </p>

                <div className="mt-auto pt-4 flex justify-between items-center">
                  <span className="text-red-600 font-bold">
                    ₹{(price / 100).toFixed(0)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(info)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestroDetail;
