import React from 'react';
import { useCart } from '../uceCart';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, removeAllItems } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal > 500 ? 0.1 * subtotal : 0;
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal - discount + deliveryFee;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    toast.success('Purchase successful!');
    setTimeout(() => {
      removeAllItems();
      navigate('/');
    }, 1500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-24">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty 😔</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.image || 'https://via.placeholder.com/64'}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price} × {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-4">Remove</button>
              </div>
            </div>
          ))}

          {/* Billing Section */}
          <div className="mt-6 p-4 bg-gray-50 rounded shadow">
            <h4 className="text-xl font-semibold mb-2">Billing Summary</h4>
            <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Discount</span><span>- ₹{discount.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Delivery Fee</span><span>₹{deliveryFee}</span></div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Grand Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
