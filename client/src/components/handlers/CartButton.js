import React from "react";

const CartButton = ({ itemId, action, quantity }) => {
  const handleCartAction = async () => {
    //console.log("Button clicked:", { itemId, action }); //////////////

    const userId = "e62a17e5-9c48-4a71-b7d8-1e2e7c6fcf3b"; // Constant User ID
    const API_BASE_URL = "https://e-commerce-backend.onrender.com"; // MODIFY THIS IF WORKING LOCALHOST/SERRVER

    const url =
      action === "add" ? `${API_BASE_URL}/cart` : `${API_BASE_URL}/cart/manage`;

    try {
      const response = await fetch(url, {
        method: action === "add" ? "POST" : "PUT", // POST for add, PUT for remove
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          itemId,
          quantity,
          action,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log({
        status: response.status,
        message: data.message,
        cartId: data.cartId || null,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      onClick={handleCartAction}
      className={action === "add" ? "add-to-cart" : "remove-from-cart"}
    >
      {action === "add" ? "+" : "-"}
    </button>
  );
};

export default CartButton;
