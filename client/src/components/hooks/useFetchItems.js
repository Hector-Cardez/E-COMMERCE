import { useState, useEffect } from "react";

const useFetchItems = () => {
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState([]);
  const [bodyLocations, setBodyLocations] = useState([]);

  useEffect(() => {
    fetch("/items")
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
  }, []);

  return { items, categories, bodyLocations };
};

export default useFetchItems;
