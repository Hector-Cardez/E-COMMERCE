import { useState, useEffect } from "react";

const useFetchItems = () => {
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState([]);
  const [bodyLocations, setBodyLocations] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.items);

        // Extract unique categories and body locations
        const uniqueCategories = [
          ...new Set(data.items.map((item) => item.category)),
        ];
        const uniqueBodyLocations = [
          ...new Set(data.items.map((item) => item.body_location)),
        ];

        setCategories(uniqueCategories);
        setBodyLocations(uniqueBodyLocations);
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, [API_URL]);

  return { items, categories, bodyLocations };
};

export default useFetchItems;
