import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Clear cart with confirmation popup
  const handleClearCart = () => {
    const confirm = window.confirm("Are you sure you want to clear the cart?");
    if (confirm) {
      clearCart();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto p-8">

        {/* Header with Clear Cart button */}
        <div className="flex items-center text-center justify-between mb-6">
          <h1 className="text-3xl  font-bold text-gray-800">
            {cartItems.length > 0 && "Your Cart 🛒"}
          </h1>

          {/* ===== CLEAR CART BUTTON ===== */}
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm active:scale-95 transition-all duration-150"
            >
               Clear Cart
            </button>
          )}
          {/* ===== END CLEAR CART BUTTON ===== */}

        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <img 
              src="https://res.cloudinary.com/dal1ft5go/image/upload/f_auto,q_auto/1774372813300_qpyxhd"
              alt="Empty Cart"
              className="w-80 h-80 object-cover rounded-lg"
            />
            <p className="text-xl font-semibold text-gray-500">
              Your cart is empty!
            </p>
            <p className="text-gray-400 text-sm">
              Add some products to your cart
            </p>
            <button
            onClick={() => navigate("/products")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-10 cursor-pointer py-4 rounded-full shadow-xl active:scale-95 transition-all duration-200"
          >
             Shop Now
          </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow p-4 flex items-center gap-4"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-800 text-sm line-clamp-1">
                      {item.title}
                    </h2>
                    <p className="text-blue-600 font-bold">${item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full text-lg font-bold flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full text-lg font-bold flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <p className="text-gray-700 font-semibold w-16 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 text-xl ml-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Total & Checkout */}
            <div className="bg-white rounded-xl shadow p-6 mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">Total Items:</span>
                <span className="font-semibold">
                  {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-800">
                  Total Amount:
                </span>
                <span className="text-2xl font-extrabold text-blue-600">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-3 rounded-xl active:scale-95 transition-all duration-150">
               Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;