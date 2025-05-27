import { useState, useEffect } from "react";

const useFetchCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/companies`)
      .then((response) => response.json())
      .then((data) => setCompanies(data.companies))
      .catch((error) => console.error("Error fetching companies:", error));
  }, [API_URL]);

  return companies;
};

export default useFetchCompanies;
