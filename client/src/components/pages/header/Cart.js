import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/Cart.css";

// Component that retrieves items that have been selected to purchase, and displays them for the user
const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = "e62a17e5-9c48-4a71-b7d8-1e2e7c6fcf3b"; // Hardcoded user ID for now
  const API_BASE_URL =
    process.env.REACT_APP_API_URL || "https://e-commerce-backend.onrender.com";

  useEffect(() => {
    fetch(`${API_BASE_URL}/cart/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCart(data.cart);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
        setLoading(false);
      });
  }, []);

  // Handles navigation to pages
  const handleContinueShopping = () => {
    navigate("/items");
  };

  const handleCheckout = () => {
    navigate("/order");
  };

  const handleCancelOrder = () => {
    navigate("/items");
  };

  return (
    <div className="cart-form">
      <h1 className="cart-title">Order Summary</h1>
      <h2 className="cart-subtitle">
        Please take a moment to review your order, thank You!
      </h2>

      <div className="items-container">
        {loading ? (
          <h2 className="empty-cart">Loading...</h2>
        ) : cart && cart.items.length > 0 ? (
          <ul>
            {cart.items.map((item) => (
              <div key={item.itemId}>
                <img src={item.itemImageSrc} alt="cart item" />
                <h2 className="cart-subtitle">{item.itemName}</h2>
                <h2 className="cart-subtitle">
                  {item.itemPrice} {" x "} {item.quantity}
                </h2>
              </div>
            ))}
          </ul>
        ) : (
          <h2 className="empty-cart">
            It appears that your cart is empty. Please try again.
          </h2>
        )}
      </div>

      <div className="button-container">
        <button onClick={handleContinueShopping} className="cart-action-button">
          Continue Shopping
        </button>
        <button onClick={handleCheckout} className="cart-action-button">
          CHECKOUT
        </button>
        <button onClick={handleCancelOrder} className="cart-action-button">
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
