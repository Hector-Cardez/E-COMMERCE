import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "../../styles/Cart.css";
//component that retrieves items that have been selected to purchase, ans displays them for the user
const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/cart")
      .then((response) => response.json())
      .then((data) => {
        setCart(data.cart);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  // Handles navigate to pages
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
        ) : (
          <ul>
            {cart.items.map((item) => {
              return (
                <div key={item.itemName}>
                  <img src={item.itemImageSrc} alt="cart item" />
                  <h2 className="cart-subtitle">{item.itemName}</h2>
                  <h2 className="cart-subtitle">
                    {item.itemPrice}
                    {" X "}
                    {item.quantity}
                  </h2>
                </div>
              );
            })}
          </ul>
        )}
        {!cart ? (
          <h2 className="empty-cart">
            It appears that your cart is empty. PLease try again.
          </h2>
        ) : null}
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
